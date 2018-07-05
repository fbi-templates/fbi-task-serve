# fbi-task-serve
Static server with directory listings.

> This is a fbi task. If you haven't installed [fbi](https://github.com/AlloyTeam/fbi) yet, use the following command to install.
>
> `$ npm i -g fbi` or `yarn global add fbi`

## Requirements
- `fbi v3.0+`
- `node v7.6+`

## Features

- serve static files
- directory listings

## Usage

**Install**

```bash
$ fbi add https://github.com/fbi-templates/fbi-task-serve.git
```

**Run**

```bash
$ cd path/to/any/directory
$ fbi serve
```

**Run with params**

```bash
$ fbi serve -p=9999
$ fbi serve -port=9999
```

## More
- [Official templates](https://github.com/fbi-templates)
- [`fbi` documentation](https://neikvon.gitbooks.io/fbi/content/)

## License
[MIT](https://opensource.org/licenses/MIT)

## Changelog

- **2.0.0** (2018.07.05)
  - replace `koa` with `express`
  - support directory listings

- **1.2.0** (2017.11.25)
  - init