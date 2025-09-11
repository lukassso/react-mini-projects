import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface UserProps {
  name: string;
  email: string;
  company: {
    name: string;
  };
}

interface PostsProps {
  title: string;
}

const UserDetail: React.FC = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [posts, setPosts] = useState<PostsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useParams();
  const API_USER = `https://jsonplaceholder.typicode.com/users/${userId}`;
  const API_POSTS = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const [userResponse, postsResponse] = await Promise.all([
          fetch(API_USER),
          fetch(API_POSTS),
        ]);
        if (!userResponse.ok) throw new Error(`error: ${userResponse.status}`);
        if (!postsResponse.ok)
          throw new Error(`error: ${postsResponse.status}`);

        const [userData, postsData] = await Promise.all([
          userResponse.json(),
          postsResponse.json(),
        ]);

        setUser(userData);
        setPosts(postsData);
      } catch (err) {
        if (err instanceof Error) setError(`error: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, [userId]);

  if (loading) return <div>Loading user...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <div>
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
        <p>{user?.company?.name}</p>
      </div>
      <div>
        <h1>{`${user?.name}'s Posts`}</h1>
        <div>
          {posts.map((post) => (
            <div>{post.title}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
