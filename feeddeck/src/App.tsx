// src/App.tsx
import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

// Types (mirror of Rust models)
interface Feed { id: number; title: string; url: string }
interface Article { id: number; feed_id: number; title: string; url: string; description: string; date: number; is_read: boolean }
interface NewFeedPayload { url: string }

function App() {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedFeedId, setSelectedFeedId] = useState<number | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [newFeedUrl, setNewFeedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load feeds on startup
  useEffect(() => {
    async function loadInitialFeeds() {
      setIsLoading(true);
      setError(null);
      try {
        const loadedFeeds: Feed[] = await invoke("get_feeds");
        setFeeds(loadedFeeds);
      } catch (e: any) {
        console.error(e);
        setError(`Failed to load feeds: ${e}`);
      } finally {
        setIsLoading(false);
      }
    }
    loadInitialFeeds();
  }, []);

  // Add a new feed
  const handleAddFeed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedUrl.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const payload: NewFeedPayload = { url: newFeedUrl };
      const newFeed: Feed = await invoke("add_feed", { payload });
      setFeeds([...feeds, newFeed]);
      setNewFeedUrl("");
    } catch (e: any) {
      console.error(e);
      setError(e.toString());
    } finally {
      setIsLoading(false);
    }
  };

  // Select a feed and load its articles
  const handleSelectFeed = async (feed: Feed) => {
    setSelectedFeedId(feed.id);
    setSelectedArticleId(null);
    setIsLoading(true);
    setError(null);
    try {
      const loadedArticles: Article[] = await invoke("get_articles_for_feed", { feedId: feed.id });
      setArticles(loadedArticles);

      // Background refresh
      invoke("refresh_feed", { feedId: feed.id, url: feed.url })
        .then(async () => {
          const refreshedArticles: Article[] = await invoke("get_articles_for_feed", { feedId: feed.id });
          if (selectedFeedId === feed.id) setArticles(refreshedArticles);
        })
        .catch(e => console.error(`Failed to refresh feed ${feed.title}:`, e));
    } catch (e: any) {
      console.error(e);
      setError(e.toString());
    } finally {
      setIsLoading(false);
    }
  };

  // Mark an article as read (optimistic UI, then backend)
  const handleSelectArticle = (article: Article) => {
    setSelectedArticleId(article.id);
    if (!article.is_read) {
      setArticles(prev => prev.map(a => a.id === article.id ? { ...a, is_read: true } : a));
      invoke("toggle_article_read_status", { articleId: article.id, isRead: true })
        .catch(e => console.error("Failed to mark read:", e));
    }
  };

  const getSelectedArticle = () => articles.find(a => a.id === selectedArticleId);

  return (
    <div className="app-container">
      <PanelGroup direction="horizontal" className="main-panel-group">
        <Panel defaultSize={25} minSize={20} className="panel panel-feeds">
          <div className="panel-header"><h3>Feeds</h3></div>
          <form onSubmit={handleAddFeed} className="add-feed-form">
            <input value={newFeedUrl} onChange={(e) => setNewFeedUrl(e.target.value)} placeholder="Add feed URL..." disabled={isLoading} />
            <button type="submit" disabled={isLoading}>+</button>
          </form>

          {error && (
            <div className="error-box" onClick={() => setError(null)}>
              <strong>Error:</strong> {error.replace("Erro ao buscar feed: ", "")}
              <span className="close-error">x</span>
            </div>
          )}

          <div className="feed-list">
            {feeds.map(feed => (
              <button key={feed.id} className={`feed-item ${feed.id === selectedFeedId ? 'active' : ''}`} onClick={() => handleSelectFeed(feed)} disabled={isLoading}>{feed.title}</button>
            ))}
          </div>
        </Panel>

        <PanelResizeHandle className="resize-handle" />

        <Panel defaultSize={35} minSize={20} className="panel panel-articles">
          <div className="panel-header"><h3>Articles</h3></div>
          <div className="article-list">
            {isLoading && articles.length === 0 && <p className="loading-text">Loading...</p>}
            {articles.map(article => (
              <button key={article.id} className={`article-item ${article.id === selectedArticleId ? 'active' : ''} ${article.is_read ? 'read' : ''}`} onClick={() => handleSelectArticle(article)}>
                <span className="article-title">{article.title}</span>
                <span className="article-date">{new Date(article.date * 1000).toLocaleDateString()}</span>
              </button>
            ))}
          </div>
        </Panel>

        <PanelResizeHandle className="resize-handle" />

        <Panel defaultSize={40} minSize={30} className="panel panel-content">
          {selectedArticleId && getSelectedArticle() ? (
            <div className="article-content">
              <h2>{getSelectedArticle()?.title}</h2>
              <a href={getSelectedArticle()?.url} target="_blank" rel="noopener noreferrer">Open original</a>
              <div className="article-body" dangerouslySetInnerHTML={{ __html: getSelectedArticle()?.description || "" }} />
            </div>
          ) : (
            <div className="article-placeholder"><p>Select an article to read</p></div>
          )}
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default App;