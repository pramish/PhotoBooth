# To start the project please add the following in the .env file

- CLOUDINARY_URL= your cloudinary api key goes here

- NODE_ENV = your environment model i.e. testing, development or production goes here

- MONGOURI=YOUR MONGO URI GOES HERE

- secret = YOUR SECRET GOES HERE

- GOOGLE_APPLICATION_CREDENTIALS = PATH TO THE JSON FILE FOR THE GOOGLE CLOUD VISON goes here

# How to run the application

- From the root folder of the application folder run

  # npm run dev

- this will run the **server** and **client** concurrently.

  # npm run server

- this will run the **server** only.

- From the **frontend** folder to run the client
  # yarn start

# Folder structure of the application

- The **server** and **client** are separated into the two **folders** i.e. **frontend** for the **client** and **server** files are on the root folder.

- **Feeds** and **Users** are the based on the resources so it is under the api folder.

- The helpers folder has the most CRUD functionality for all the Feeds and Users.

- Under **helpers**, **imageUploader.js** is the uploader helper for Cloudinary so that it can be reused while uploading the images.

- Under **helpers** folder, **index.js** defines the routes for the application.

- For the **frontend**, all the resuable components are under the **app** folder which is under the **src** folder of **frontend**

# Application Architecture

- Backend are based on the **Resource** Based Architecture.

- The application is a **resource** based so all the functionality are defined based on the resources. For example, the **Feeds** api are under the **Feeds** folder and **Users** api are under the **Users** folder.
