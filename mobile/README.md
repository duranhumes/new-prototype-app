# Prototype Mobile

## Installing

* Run `yarn` to install node_modules
* Run `yarn start` to boot the app

1. The api folder contains all endpoints in one central place so it's easy to change.
2. The main action happens in the screens folder where each screen pretty much lives independant of each other with it's own views, components, constant, functions etc.
3. Each api request to the backend should be wrapped with the `checkAPIHealth` function to prevent easily preventable errors.
4. The `components/` dir at the base of `src/` is meant for global components that every screen can use, meaning they're really generic. Try to keep specifics to local components dir as that helps maintainablity of the codebase.
5. The `constants/` dir holds global constansts like images, and the theme. I find it good to have a global constanst for images as it helps with not having to think about changing the path or even image file in multiple places.
6. The `services/` dir houses only the `NavigationService` for now which helps with navigating throught the app without the need for react-navigation to get involved at a component level. This really comes in handy when you have a one off component that shouldn't really have to know about the navigation props that are passed to each screen. This dir will hold more helpers like this in the future.
7. `types/` is really for module type definitions or lack thereof, some modules still don't have typescript definitions so thats where the typescript compiler will look for them, besides the `node_modules/@types/` and the modules `index.d.ts` file.

### How to add new screens?
1. Create a new dir in the `screens/` dir with an `index.tsx` file to serve as the entrypoint.
2. You can base your new screen off of one of the already working screens and [react-navigation docs](https://reactnavigation.org/) if you need more information on how to setup a stackNavigator, tab icons, labels etc.
3. Create your screen file how you'd like it then import into the `index.tsx` file like so `getScreen: () => require('./Search').default`, it must be done this way according to react navigation.
4. Open the `index.tsx` file in the base of the `src/` folder and import your new screen/stack and add it to the `TabNavigator` variable. Again the react navigation docs are really helpful to get a better understanding of what can be done.

### Icons can be found here
[icons](https://expo.github.io/vector-icons/)


### Rendering html can sometimes cause css conversion errors like `Warning: Failed prop type: Invalid prop lineHeight of type string supplied to ForwardRef(Text), expected number`
You'd have to add the `ignoredStyles` prop to the `HTML` component and supply it with an array of the css style that is causeing the errors.
(see)[https://github.com/archriss/react-native-render-html/issues/154#issuecomment-457803016]
