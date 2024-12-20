import { Injectable } from "@angular/core";
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
      description: "This is the first mock article",
      body: "Content of the first mock article",
      tagList: ["mock", "example"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorited: false,
      favoritesCount: 10,
      author: {
        username: "mockUser1",
        bio: "Bio of mockUser1",
        image: "https://example.com/user1.jpg",
        following: false,
      },
    },
    {
      slug: "mock-article-2",
      title: "Mock Article 2",
      description: "This is the second mock article",
      body: "Content of the second mock article",
      tagList: ["angular", "mock"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorited: true,
      favoritesCount: 5,
      author: {
        username: "mockUser2",
        bio: "Bio of mockUser2",
        image: "https://example.com/user2.jpg",
        following: true,
      },
    },
  ];

  constructor() {}

  // Mock implementation of `query`
  query(
    config: ArticleListConfig,
  ): Observable<{ articles: Article[]; articlesCount: number }> {
    // Filter articles based on mock config (if needed)
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

  // Mock implementation of `get`
  get(slug: string): Observable<Article> {
    const article = this.mockArticles.find((article) => article.slug === slug);
    return article
      ? of(article)
      : of({
          slug: "not-found",
          title: "Article Not Found",
          description: "The requested article does not exist.",
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

  // Mock implementation of `delete`
  delete(slug: string): Observable<void> {
    this.mockArticles = this.mockArticles.filter(
      (article) => article.slug !== slug
    );
    return of(undefined);
  }

  // Mock implementation of `create`
  create(article: Partial<Article>): Observable<Article> {
    const newArticle: Article = {
      ...article,
      slug: `mock-article-${this.mockArticles.length + 1}`,
      tagList: article.tagList || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorited: false,
      favoritesCount: 0,
      author: {
        username: "mockAuthor",
        bio: "Author bio",
        image: "https://example.com/default.jpg",
        following: false,
      },
    } as Article;

    this.mockArticles.push(newArticle);
    return of(newArticle);
  }

  // Mock implementation of `update`
  update(article: Partial<Article>): Observable<Article> {
    const index = this.mockArticles.findIndex((a) => a.slug === article.slug);
    if (index !== -1) {
      this.mockArticles[index] = {
        ...this.mockArticles[index],
        ...article,
        updatedAt: new Date().toISOString(),
      } as Article;
      return of(this.mockArticles[index]);
    }
    return of(null as any);
  }

  // Mock implementation of `favorite`
  favorite(slug: string): Observable<Article> {
    const article = this.mockArticles.find((article) => article.slug === slug);
    if (article) {
      article.favorited = true;
      article.favoritesCount++;
      return of(article);
    }
    return of(null as any);
  }

  // Mock implementation of `unfavorite`
  unfavorite(slug: string): Observable<void> {
    const article = this.mockArticles.find((article) => article.slug === slug);
    if (article) {
      article.favorited = false;
      article.favoritesCount--;
    }
    return of(undefined);
  }
}
