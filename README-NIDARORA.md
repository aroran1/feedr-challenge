# Frontend Challenge Attempt - Nidhi Arora
- converted project to typescript
- using MobX for state management
- Project Architecture: Split into below sections
  - stores: store creates the observable state, initiates the promise operation and also handles data updates
  - services: services class provides the fetch method and also helps keeping api and stores segregated
  - models: is set to check the data model interface that is fetched and passed around
  - components: is split into common, and feature specific folder structure so it can scale easily without being too coupled
- tests are set-up with jest enzyme
