![](https://img.shields.io/badge/Built%20with%20%E2%9D%A4%EF%B8%8F-at%20Technologiestiftung%20Berlin-blue)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Berlin Air Quality Map

This interactive map allows you to explore the air quality in Berlin based on the yearly average for 2024.

### 🚀 Features

- Check Air Quality: Click on the map or enter an address to view the pollution level at that location.
- Improvement Recommendation: Each location includes a "Bedarf für Luftverbesserung" (Need for Air Improvement) rating with the following categories:
  - Sehr niedrig (Very Low)
  - Niedrig (Low)
  - Mäßig (Moderate)
  - Erhöht (Elevated)
  - Hoch (High)

### 📊 Data Source

The air quality data is sourced from the follwing project: [Luftschadstoffprognose](https://www.berlin.de/weniger-dicke-luft/projekte-und-massnahmen/luftschadstoffprognose/)

## Prerequisites

- App

  - **npm** to develop the app

- Data Update

  - **python** to run the data preparation jupiter notebook.
  - **tippecanoe** to create vector tiles.

## Usage or Deployment

```bash
npm run build
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Data preparation

To create/update the vector tiles (the data displayed on the map) run the [jupiter notebook](./data-preparation/create_grid.ipynb) which does all the data preparation.

## Contributing

Before you create a pull request, write an issue so we can discuss your changes.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://fhp.incom.org/profile/9200/projects"><img src="https://avatars.githubusercontent.com/u/46717848?v=4?s=64" width="64px;" alt="anna"/><br /><sub><b>anna</b></sub></a><br /><a href="#design-annameide" title="Design">🎨</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://hanshack.com/"><img src="https://avatars.githubusercontent.com/u/8025164?v=4?s=64" width="64px;" alt="Hans Hack"/><br /><sub><b>Hans Hack</b></sub></a><br /><a href="https://github.com/technologiestiftung/odis-luftqualitaet/commits?author=hanshack" title="Code">💻</a> <a href="#content-hanshack" title="Content">🖋</a> <a href="#data-hanshack" title="Data">🔣</a> <a href="#projectManagement-hanshack" title="Project Management">📆</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## Related Projects

[Aktueller Luftqualitätsindex Berlin](https://luftdaten.berlin.de/lqi)
[Weniger dicke Luft für Berlin](https://www.berlin.de/weniger-dicke-luft/)
[Luftschadstoffprognose](https://www.berlin.de/weniger-dicke-luft/projekte-und-massnahmen/luftschadstoffprognose/)

## Content Licensing

Texts and content available as [CC BY](https://creativecommons.org/licenses/by/3.0/de/).

## Credits

<table>
  <tr>
    <td>
      Made by: <a href="https://odis-berlin.de">
        <br />
        <br />
        <img width="200" src="https://logos.citylab-berlin.org/logo-odis-berlin.svg" />
      </a>
    </td>
    <td>
      Together with: <a href="https://citylab-berlin.org/en/start/">
        <br />
        <br />
        <img width="200" src="https://logos.citylab-berlin.org/logo-citylab-berlin.svg" />
      </a>
    </td>
    <td>
      A project by: <a href="https://www.technologiestiftung-berlin.de/en/">
        <br />
        <br />
        <img width="150" src="https://logos.citylab-berlin.org/logo-technologiestiftung-berlin-en.svg" />
      </a>
    </td>
    <td>
      Supported by <a href="https://www.berlin.de/rbmskzl/">
        <br />
        <br />
        <img width="80" src="https://citylab-berlin.org/wp-content/uploads/2021/12/B_RBmin_Skzl_Logo_DE_V_PT_RGB-300x200.png" />
      </a>
    </td>
  </tr>
</table>
