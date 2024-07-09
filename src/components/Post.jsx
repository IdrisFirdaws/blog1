import React from "react";
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function Post({ _id, title, summary, content, cover, createdAt, author }) {
    // Truncate text to a certain number of words
    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    // Truncate the content to the first 50 words for intro
    const truncatedIntro = truncateText(content, 50);

    return (
        <div className="entry">
            <div className="image">
                <Link to={`/post/${_id}`}>
                    <img src={`${process.env.REACT_APP_API_URL}/${cover}`} alt="cover" />
                </Link>
            </div>
            <div className="detail">
                <div className="title">
                    {title}
                </div>
                <div className="author">
                    <div className="name">
                        By: {author.username}
                    </div>
                    <div className="date">{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</div>
                </div>
                <div className="intro">
                    {/* Displaying summary directly */}
                    <div dangerouslySetInnerHTML={{ __html: summary }} />
                    {/* Displaying truncated content */}
                    <div dangerouslySetInnerHTML={{ __html: truncatedIntro }} />
                    <span className="more">
                        <Link to={`/post/${_id}`}>
                            Read more
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}
