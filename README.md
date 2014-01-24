simple-bower-registry
=====================

A very simple registry server compatible with bower 1.x. Designed for those who want to host their own private registry.

###Usage

Clone this repo with `git clone`. After that run `npm install` inside the newly created foler. Then you can run the server as `simple-bower-registry`.

The server runs on port 3333.

By default the registry data is stored in a single file `./official-package-data.json`.
In this fork, if you register a package against this server it will be saved in another file `./custom-package-data.json`.

To use your server with bower, update (or create) a .bowerrc file either in your home directory or in the directory for the package you are working on that needs the private registry. Create a key of `registry` and set it to the URL of the registry server, e.g.

```json
{
  "registry": "http://localhost:3333"
}
```

###Differences from the live bower registry

- If you make a mistake when registering a package, you can just submit it again and it will overwrite the existing one.
- There is no database to manage. The data is kept in memory and persisted to a plain JSON file.

###Differences from the original simple-bower-registry

- You can fetch the original bower repo data from bower.herokuapp.com/packages and save it directly as `./official-package-data.json`.
- If you registry a package it will be saved at `./custom-package-data.json` so you can keep updating the original without problems.
- This one rewrites `git://` to `https://` because git endpoint is frequently blocked on corporate environments.