# csci32-meier

This repository is for the CSCI 32 course at Butte College, Oroville California. This repository contains all the code for assignments thorough the course.

This is a test repo for multiple project deployment in a single repository, potentially paving the way for future class projects. It effectively shows weekly work progress in a single Vercel deployment.

## Important Note

Copy all files except for the .next directory and the node_modules directory from week-\<previous> to week-\<current> (week-01 -> week-02).

Add the new files (copied from week-\<previous>) to the repository with `git add week-<previous>` and commit your changes as a new week's init commit. `git commit -m "week-<current> init"`

Ensure your terminal is in the correct directory before running the following commands. (e.g. `cd week-02`). These commands will initialize the repository, install the necessary dependencies, and run the development server for testing.

```node
npm init
npm install
npm run dev
```

## Vercel Deployment

Note: Make sure that each sub-directory has its own package.json file. This is necessary for Vercel to deploy the project correctly.

Vercel allows you to deploy specific subdirectories from a monorepo. You will need to configure each project within Vercel:

1. After linking the repository, Vercel will prompt you to configure your project.
2. In the Root Directory section, specify the subdirectory for the project you want to deploy. For example, for the `week-01` project, set the root directory to: `week-01/`
3. After setting up the configuration, click Deploy.
