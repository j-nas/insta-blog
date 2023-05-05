# Do you REALLY need SSR?

## Introduction

React has revolutionized the way we think about building web applications. Its concept of sending a JavaScript bundle to a user's device that can render HTML and update it as things change has made it easier to build complex UIs. With React, it became easier to render things on the client and just send JSON blobs back and forth, eliminating the need to fetch new HTML every time something changes. However, this resulted in a performance hit since the client device was now responsible for a lot more work, and HTML metadata and tags were lost.

## The Problem with Client-Side Rendering

When building an application with client-side rendering, every time a user interacts with the application, the client needs to request not only new data from the server but also the JavaScript and HTML. This can lead to long load times, slower performance, and multiple requests sent back and forth between the client and server. Rendering content on the client can also result in a poor user experience, leading to blank pages, loading spinners, and a lot of waiting.

That's where server-side rendering (SSR) comes into play. With SSR, the server renders the HTML and sends it to the user, resulting in a real page that appears instantly.

## The Benefits of Server-Side Rendering

The main benefit of server-side rendering is that it trades off the longer window of the first load for a significantly better experience of the page loading in with correct and updated information. With SSR, the page loads with the right content already on it, meaning that it appears instantly, instead of waiting for the client to fetch all the data and render everything on its own. With SSR, the user gets a fully functional page right from the start, and there's no need to wait for JavaScript to initialize or fetch data from the server.

Another benefit of SSR is that it can improve SEO. Since search engines can read the HTML content on the server, pages are more likely to be indexed and ranked. This is because the search engine can see the fully rendered content without having to execute JavaScript or other client-side code.

## The Challenges of Server-Side Rendering

However, SSR isn't without its challenges. One of the problems with SSR is that it requires more server resources, as more work needs to be done on the server-side to render each page. This means you may need to invest more in infrastructure to support SSR, particularly if you have a high traffic site. Additionally, there are some complexities to implementing SSR, particularly if you are using a complex framework like React.

## The Solution: The New React Server Component Model

In recent years, React has introduced a new model for server-side rendering known as SSR. The new server component model allows you to write your React code once, generate HTML, and also update later on the client side from that point forward. With this model, React has addressed many of the challenges of traditional server-side rendering.

The server component model works by having the server render pre-processed components into HTML markup. The server then sends that HTML to the client, where React takes over and continues rendering the components on the client-side using the same pre-processed components. This allows for a faster initial load time and a more seamless experience for the user.

The server component model also allows for the benefits of React to be leveraged on the server-side as well. With React, you can create reusable UI components that can be used across multiple pages. This means that you can have a more consistent design across your site, and it's easier to maintain a set of standards across your entire app.

## Conclusion

Server-side rendering can have a significant impact on your application's performance and user experience, particularly if you are working with a complex framework like React. While there are some challenges to implementing SSR, particularly around the extra server resources required, the benefits can be significant. By leveraging the new React server component model, you can write your React code once, generate HTML, and also update later on the client side from that point forward, resulting in a faster initial load time and a more seamless user experience.
