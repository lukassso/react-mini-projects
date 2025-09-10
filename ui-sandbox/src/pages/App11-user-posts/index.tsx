import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const API_LIST = "https://jsonplaceholder.typicode.com/users";
const API_POSTS = "https://jsonplaceholder.typicode.com/posts";

const UserPostBrowser = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number>(1);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState<{ users: boolean; posts: boolean }>({
    users: true,
    posts: false,
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_LIST);
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(`error: ${err}`);
        }
      } finally {
        setLoading((prev) => ({
          ...prev,
          users: false,
        }));
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    setLoading((prev) => ({
      ...prev,
      posts: true,
    }));
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_POSTS}?userId=${selectedUserId}`);
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(`error: ${err}`);
        }
      } finally {
        setLoading((prev) => ({
          ...prev,
          posts: false,
        }));
      }
    };
    fetchPosts();
  }, [selectedUserId]);

  const errorComponent = <div>{error}</div>;
  const loadingComponent = <div>Loading...</div>;

  return (
    <div className="flex h-screen">
      <aside className="w-1/3 p-4 bg-gray-100 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        {error
          ? errorComponent
          : loading.users
          ? loadingComponent
          : users.map((user) => {
              return (
                <button onClick={() => setSelectedUserId(user.id)}>
                  <ul>
                    <li>{user.name}</li>
                    <li>{user.email}</li>
                  </ul>
                </button>
              );
            })}
      </aside>
      <main className="w-2/3 p-4">
        <h2 className="text-xl font-bold mb-4">Posts</h2>
        {error
          ? errorComponent
          : loading.posts
          ? loadingComponent
          : posts.map((post) => (
              <div>
                <div>{post.title}</div>
                <div>{post.body}</div>
              </div>
            ))}
      </main>
    </div>
  );
};

export default UserPostBrowser;
