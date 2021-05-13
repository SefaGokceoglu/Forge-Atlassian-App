# Forge Cahnge Logs App

This project contains a Forge UI Kit app written in React that displays in a Jira issue panel.

See [developer.atlassian.com/platform/forge/](https://developer.atlassian.com/platform/forge) for documentation and tutorials explaining Forge.

## Requirements

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Quick start

### Register the app

- Register the app by running:

```
forge register
```

- Install dependencies at root directoy 

```
npm install
```

### Frontend

- Change into the frontend directory by running:

```
cd ./static/spa
```

- Install your frontend dependencies by running:

```
npm install
```

### Deployment

For this section, ensure you have navigated back to the root of the repository.

- Build and deploy your app by running:

```
forge deploy
```

- Install your app in an Atlassian site by running:

```
forge install
```

## Usage

- Open a issue panel 
- Create Custom Field by using Create Change Log Field button
- Associate Screens to The Change Log custom field at the settings
- You can use Export Change Logs to Custom Field button to export change logs to Custom Field
