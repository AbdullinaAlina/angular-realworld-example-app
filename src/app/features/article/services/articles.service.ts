import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ArticleListConfig } from "../models/article-list-config.model";
import { Article } from "../models/article.model";

@Injectable({ providedIn: "root" })
export class ArticlesService {
  private mockArticles: Article[] = [
    {
      slug: "mock-article-1",
      title: "Mock Article 1",
      description: "Description of a mock article 1",
      body: "Body of a mock article ",
      tagList: ["art", "design"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorited: false,
      favoritesCount: 1,
      author: {
        username: "smth",
        bio: "Bio of mockUser1",
        image: "",
        following: false,
      },
    },
    {
      slug: "mock-article-2",
      title: "mock article 2",
      description: "Description of a mock article 2",
      body: "Body of a mock article 2",
      tagList: ["science", "physics"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorited: false,
      favoritesCount: 2,
      author: {
        username: "not smth",
        bio: "Bio of mockUser2",
        image: "",
        following: true,
      },
    },
    {
      slug: "mock-article-3",
      title: "Mock Article 3",
      description: "Description of a mock article 3",
      body: "Body of a mock article 3 ",
      tagList: ["health", "fitness"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorited: false,
      favoritesCount: 1,
      author: {
        username: "not smth too",
        bio: "Bio of not smth too",
        image: "",
        following: false,
      },
    },
  ];

  constructor(private readonly http: HttpClient) {}
  
  query(
    config: ArticleListConfig,
  ): Observable<{ articles: Article[]; articlesCount: number }> {

    const filteredArticles = this.mockArticles.filter((article) => {
      if (config.filters.tag) {
        return article.tagList.includes(config.filters.tag);
      }
      return true;
    });

    return of({
      articles: filteredArticles,
      articlesCount: filteredArticles.length,
    });
  }

  get(slug: string): Observable<Article> {
    const article = this.mockArticles.find((article) => article.slug === slug);
    return article
      ? of(article)
      : of({
          slug: "not-found",
          title: "Article not found",
          description: "Article not found",
          body: "",
          tagList: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          favorited: false,
          favoritesCount: 0,
          author: {
            username: "",
            bio: "",
            image: "",
            following: false,
          },
        });
  }

  delete(slug: string): Observable<void> {
    return this.http.delete<void>(`/articles/${slug}`);
  }

  create(article: Partial<Article>): Observable<Article> {
    return this.http
      .post<{ article: Article }>("/articles/", { article: article })
      .pipe(map((data) => data.article));
  }

  update(article: Partial<Article>): Observable<Article> {
    return this.http
      .put<{ article: Article }>(`/articles/${article.slug}`, {
        article: article,
      })
      .pipe(map((data) => data.article));
  }

  favorite(slug: string): Observable<Article> {
    return this.http
      .post<{ article: Article }>(`/articles/${slug}/favorite`, {})
      .pipe(map((data) => data.article));
  }

  unfavorite(slug: string): Observable<void> {
    return this.http.delete<void>(`/articles/${slug}/favorite`);
  }
}
