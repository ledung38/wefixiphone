"use client";
import { Button } from "@/components/ui";
import Card, { CardContent, CardHeader } from "@/components/ui/Card";
import React from "react";

const Home = () => {
  return (
    <div className="container px-8 mx-auto">
      <nav className="flex items-center justify-between px-4 py-8 max-w-2xl mx-auto border-b border-primary/20 dark">
        <h2 className="text-2xl font-bold">ThreeThemes</h2>

        <ul className="flex gap-8 items-center">
          <li>Home</li>
          <li>About</li>
          <li>
            <ContactUsButton />
          </li>
        </ul>
      </nav>

      <main className="py-8 px-4 mx-auto max-w-2xl space-y-8">
        <h1 className="text-3xl font-bold">Lorem.</h1>

        <p className="max-w-prose">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod nisi,
          doloremque officia eum iusto obcaecati necessitatibus eos mollitia
          laborum aspernatur non in aut delectus quam dolorem facilis est saepe
          nulla.
        </p>

        <div className="flex items-center gap-4">
          <button className="border rounded px-2 py-1">Get Started</button>
          <ContactUsButton />
        </div>

        <Button color="error" variant="text" onClick={() => {}}>
          312312
        </Button>

        <Button variant="link" color="default" size={"sm"}>
          312312
        </Button>

        <Card padding="16px" shadow="none" variant="borderLinear" type="purple">
          <CardContent>Content</CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Home;

const ContactUsButton = () => {
  return (
    <button className="px-2 py-1 rounded bg-primary text-white dark:text-gray-800 neon:text-purple-800">
      Contact Us
    </button>
  );
};
