# code reproduction repository for capacitor google maps plugin bug

code reproduction example for the tickets [capacitor-plugins issue #1139](https://github.com/ionic-team/capacitor-plugins/issues/1139) and [capacitor-plugins issue #1526](https://github.com/ionic-team/capacitor-plugins/issues/1526) regarding a bug in the [capacitor google maps plugin](https://github.com/ionic-team/capacitor-plugins/tree/main/google-maps)

a PR with a fix is available: [Cast marker id to string to avoid JS int issues #1222](https://github.com/ionic-team/capacitor-plugins/pull/1222) (submitted on Oct 11, 2022 by [muuvmuuv](https://github.com/muuvmuuv))

## steps to reproduce the issue

setup the app as described in the chapter [development environment](#development-environment-setup)

open the app and then the safari console, as decribed in the chapter [app testing in Xcode using a real device](#app-testing-in-xcode-using-a-real-device)

click the **add marker** button

then click on the marker inside of the map

look at the console (in safari dev tools)

## development environment setup

go into the root of this project an install the npm dependencies, using the following command (in your VSCode terminal):

```shell
npm i
```

add the iOS platform to the project, using this command:

```shell
npx cap add ios
```

make a copy of the `app.config.js.dist` and name it `app.config.js`, then open it and add your Google Maps API key

then make a build of the project, using the following command:

```shell
npm run build
```

now we do a copy and update of the build and plugins for capacitor, using the command:

```shell
npx cap sync
```

finally open the capacitor app in Xcode, using this command:

```shell
npx cap open ios
```

## app testing in Xcode using a real device

to test the app, connect your iPhone via USB to your Mac (if you have an M1 Mac using the simulator won't work as the Google Maps SDK being used is not compatible, this is why we use a native device), then in XCode click the **>** play button to build the app (ensure that in Xcode on top next to **App >** it is your phone that is selected and not an iOS simulator)

the first time (if you did not set your developer account in the app settings) you will see an error "build failed", on top you will see a red circle with an "x" click on it and you will see that the error is "Signing for "App" requires a development team", click on the error message to be redirected to the app settings, click on "Signing & Capabilities", under **Targets >** click on **App**, then next to **Capability** chose the option **All** (and NOT debug or release), then as **Team** chose your apple account and as **Bundle Identifier** chose something like "com.example_cap_bug.app", now click below on the button "Try Again", signing should now be fixed, so now hit the **>** play button again to launch the build process

now the build might fail again, unlock your phone and you should see a message **untrusted developer**, to fix that open the **settings app**, go into **General** then click on **VPN & Device Management**, then under **developer app** click on your account, then click **trust** and confirm a second time in the modal, go back into Xcode and launch the build again

then open safari, in the safari navigation click on **delevop** and wait for your iPhone to show up, click on **iPhone**, then click on **localhost**, then open the **console tab** in the developper tools

## installation steps history

the ["Creating a Code Reproduction" chapter from the capacitor CONTRIBUTING.md document](https://github.com/ionic-team/capacitor/blob/main/CONTRIBUTING.md) recommends using the following command to create a basic app using [`@capacitor/create-app`](https://github.com/ionic-team/create-capacitor-app):

```shell
npm init @capacitor/app
```

I removed @capacitor/camera and @capacitor/splash-screen that been added by @capacitor/create-app as those are not needed for our code reproduction:

```shell
npm uninstall @capacitor/camera @capacitor/splash-screen
```

next I added the [@capacitor/google-maps v4.5.0](https://www.npmjs.com/package/@capacitor/google-maps) plugin:

```shell
npm i @capacitor/google-maps --save-exact
```

then I added the capacitor iOS [@capacitor/ios v4.7.3](https://www.npmjs.com/package/@capacitor/ios) package as this bug is in the iOS version of the plugin:

```shell
npm i @capacitor/ios --save-exact
```

and initialzed the capacitor iOS package using the command:

```shell
npx cap add ios
```
