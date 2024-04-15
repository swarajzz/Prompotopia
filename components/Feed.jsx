"use client";

import React from "react";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimout] = useState(null); // [timeout, setTimeout
  const [searchedPosts, setSeachedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();

      setAllPosts(data);
    };
    fetchPosts();
  }, []);

  const filterPrompts = (searchText) => {
    console.log("HEY");
    const regex = new RegExp(searchText, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSeachedPosts(searchResult);
      }, 1000)
    );
  };

  const handleTagClick = (e, tag) => {
    setSearchText(tag);

    const searchResult = filterPrompts(tag ? tag : e.target.value);
    setSeachedPosts(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={!searchText ? allPosts : searchedPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
