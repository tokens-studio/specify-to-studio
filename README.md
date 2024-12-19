# Specify to DTCG format

This repository showcases how you can pull in your Specify tokens and convert them to DTCG files.

This allows for compatibility with Style Dictionary and Tokens Studio platform.

```sh
npm i
npm run build
```

The example only has 1 color token with dark/light mode themes for now.
You can find it in the `specify-tokens.json` file, the output will be put inside a `tokens` folder.

## Not implemented yet

- Automatic creation of `$themes.json` from the theme data. For now, you'll have to configure the theming in Tokens Studio manually. Refer to [sd-transforms package](https://github.com/tokens-studio/sd-transforms) on how to then create multi-theme outputs for various platforms (CSS, iOS, Android etc.)
