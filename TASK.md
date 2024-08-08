# TODO

Requirements
● [v] Create a React project written in TypeScript. [required] (2 points)
● [v] Create an Express.js API written in TypeScript. [required] (2 points)
● [] Use React Query to maintain server state [required in frontend] (2 points)
● [] Use Axios to fetch data from the server [required in frontend] (2 points)
● [v] Use MySQL, Postgres, or any SQL database of your choice [SQL is required] (2
points)
● [v] Use any ORM such as TypeORM, Bookshelf, or query builder such as Knex of your
choice [Usage or ORM or query builder is required] (2 points)
● [v] Use a UI library such as Bootstrap, Material UI, TailWind CSS, or any library of your
choice. [Usage of a UI library is required] (2 points)
● []Use Joi to validate the request body [required] (2 points)
● [] Authentication is not necessary.
● [v] Design the database schema. Save it in an SQL file during submission. (2 points)
● [] Create a screen called “Edit Link” that allows users to create and edit short links. (2
points)
● [] Create a screen called “View Links” that allows users to view all the short links
created by them. (2 points)
● [v] Make sure the short links created are always unique. (2 points)
● [v] When a user tries to access a short link via browser, the link should hit your API
server which will resolve to the target link, and redirect the browser to the destination.
(2 points)
● [] Track how many users have clicked the link and show it in a dashboard. (2 points)
● [] Try accessing the same short link 5 times in the same browser window, and check if
the count increased by 5. The count may not increase correctly. Fix this. (2 points)
● [v] Create a QR code for the short link created (2 points)
● [] Create a download button for the QR code (2 points)
● [] Track how many users have scanned the QR code and show it in the dashboard. (2
points)
● [] Aesthetic UI/UX (2 points)

# Server

- Joi required
- MySQL
- ORM
- Design the database schema. Save it in an SQL file during submission.
- Given a long link, give shortlink
- You also need to do redirection with the shortlink
- Track how many users have clicked the link and show it in a dashboard
  - Just update count and handle race conditions. Anonymous users allowed
- Generate QR code for the link
- Ability to download QR code
- Track mode of access ?ref=qr or ?ref=link (the default) should be enough

# DB Schema

ShortLinks
short_link_id: "string",
long_link: "string",
qr: "string" # b64 string

# Client

- Edit Link Screen
- View Link Screen

Create a tool that allows users to
shorten URLs
Requirements
● Create a React project written in TypeScript. (2 points)
● Create an Express.js API written in TypeScript. (2 points)
● Use React Query to maintain server state [in frontend] (2 points)
● Use Axios to fetch data from the server [in frontend] (2 points)
● Use MySQL (2 points)
● Use any ORM (2 points)
● Use a UI library such as Bootstrap, Material UI, TailWind CSS, or any library of your
choice. (2 points)
● Authentication is not necessary.
● Design the database schema. Save it in an SQL file during submission. (2 points)
● Create a screen called “Edit Link” that allows users to create and edit short links. (2
points)
● Create a screen called “View Links” that allows users to view all the short links
created by them. (2 points)
● Make sure the short links created are always unique. (2 points)
● When a user tries to access a short link via browser, the link should hit your API
server which will resolve to the target link, and redirect the browser to the destination.
(2 points)
● Track how many users have clicked the link and show it in a dashboard. (2 points)
● Try accessing the same short link 5 times in the same browser window, and check if
the count increased by 5. The count may not increase correctly. Fix this. (2 points)
● Create a QR code for the short link created (2 points)
● Create a download button for the QR code (2 points)
● Track how many users have scanned the QR code and show it in the dashboard. (2
points)
● Aesthetic UI (2 points)
Submission
● Record the final output demonstrating each requirement.
● Upload the video to YouTube (unlisted) or Google Drive (accessible to anyone with
link).
● Upload your code to GitHub. Keep the repository public.
● Share your submission to tech@houseofx.in when you are finished.
Essentials
● The interview is four hours long. However, if you finish earlier, you can submit and
leave the call.
● Screen presentation and camera should be on throughout the interview.
● Searching for documentation via search engines and reviewing other resources
during the interview are allowed.
● Usage of ChatGPT or other such LLMs will not be allowed.
● Forking repositories from GitHub will not be allowed. The project has to be
scaffolded from scratch.
● Ensure a stable network connection.
● Candidates are allowed to take short breaks for personal reasons.
