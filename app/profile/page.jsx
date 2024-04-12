"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  const handleEdit = () => {};

  const handleDelete = () => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session.user.id}/posts`);
      const data = await res.json();
      console.log(data);
      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={[]}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
