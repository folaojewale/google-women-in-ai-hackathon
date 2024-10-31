import '../css_Styles/newsContent.css'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
function NewsDetails({ news }) {
    return (
      //news layout of queried information
      <div className="layout-details">
        <h3>{news.title}</h3>
        <div className="news-info">
          <div className="flag">
            <img src={news.image_url} alt={`${news.name} image`} />
          </div>
          <div className="info">
            <p><strong>Description:</strong> {news.description}</p>
            <p><strong>Language:</strong> {news.language}</p>
            <p><strong>Date:</strong> {formatDistanceToNow(new Date(news.published_at), {addSuffix: true})}</p>
            <p><strong>Source:</strong> <a href={news.url}>{news.source}</a></p>
          </div>
        </div>
      </div>
    )
  }

export default NewsDetails