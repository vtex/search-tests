# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Cypress GitHub Action on a daily schedule, pull requests, and pushes to `main`, with Slack alerts on failure (except PRs).

### Changed

- Cypress specs and selectors to match the current biggy storefront.

### Fixed

- Cypress aborting every spec on a storefront recsys SyntaxError.
- `visitPath` using HTTP against an HTTPS base URL.
- PR workflows using retired `actions/cache` v1.

## [0.3.0] - 2022-01-18

### Added

- Autocomplete and Collection page tests.

## [0.2.2] - 2021-05-17

### Changed

- Healthcheck workflow interval.

## [0.2.1] - 2021-05-03

### Fixed

- Monitoring and PR workflows.

## [0.2.0] - 2021-05-03

### Added

- Workflow for monitoring.

## [0.1.0] - 2021-04-15

### Added

- Initial Cypress setup
- Tests for Department, Category, Full-text search, and Autocomplete.

### Added

- Initial release.
