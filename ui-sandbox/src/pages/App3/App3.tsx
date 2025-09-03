import React, { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}
interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const POST_ID = 1;

const PostWithComments: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newCommentBody, setNewCommentBody] = useState("");
  useEffect(() => {
    const fetchPostAndComments = async () => {
      setLoading(true);
      setError(null);

      try {
        const postUrl = `https://jsonplaceholder.typicode.com/posts/${POST_ID}`;
        const commentsUrl = `https://jsonplaceholder.typicode.com/posts/${POST_ID}/comments`;

        const [postResponse, commentsResponse] = await Promise.all([
          fetch(postUrl),
          fetch(commentsUrl),
        ]);

        if (!postResponse.ok)
          throw new Error(`Failed to fetch post: ${postResponse.status}`);
        if (!commentsResponse.ok)
          throw new Error(
            `Failed to fetch comments: ${commentsResponse.status}`
          );

        const [postData, commentsData] = await Promise.all([
          postResponse.json(),
          commentsResponse.json(),
        ]);

        setPost(postData);
        setComments(commentsData);
      } catch (error) {
        if (error instanceof Error) {
          setError(`Failed to fetch data: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPostAndComments();
  }, []);
  const handleAddComment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newCommentBody.trim()) return;
    const addCommentUrl = " https://jsonplaceholder.typicode.com/comments";

    setIsSubmitting(true);
    setError(null);
    try {
      const responseComment = await fetch(addCommentUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: POST_ID,
          id: Date.now(),
          name: "New Commenter",
          email: "newcommenter@example.com",
          body: newCommentBody,
        }),
      });
      const newCommentFromApi = await (await responseComment).json();
      setComments((prevComments) => [...prevComments, newCommentFromApi]);
      setNewCommentBody("");
    } catch (error) {
      throw new Error(`Failed to submit comment`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {post && (
        <article className="mb-8 p-4 bg-white shadow rounded">
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <p className="text-gray-700">{post.body}</p>
        </article>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div className="space-y-4 mb-6">
          {comments.map((comment) => (
            <div key={comment.id} className="p-3 bg-gray-50 rounded shadow-sm">
              <h3 className="font-semibold">
                {comment.name} ({comment.email})
              </h3>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddComment}>
          <textarea
            value={newCommentBody}
            onChange={(e) => setNewCommentBody(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border rounded mb-2"
          />
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Comment
          </button>
        </form>
      </section>
    </div>
  );
};

export default PostWithComments;
