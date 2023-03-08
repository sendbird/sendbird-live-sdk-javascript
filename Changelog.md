# Change Log

### 1.0.0-beta.7 (Mar 8, 2023)
* Introducing screen sharing in Live Event. Hosts can now start sharing their screen in their livestreams and share their experience with the audience.
    * Added `ScreenShareOptions`.
    * Added `CameraOverlayPosition`.
    * Added `LiveEvent.startScreenShare(options: ScreenShareOptions): Promise<void>`.
    * Added `LiveEvent.stopScreenShare(): void`.
    * Added `LiveEvent.setScreenShareOptions(options: ScreenShareOptions): void`.

## 1.0.0-beta.6 (Jan 11, 2022)
- Add interfaces to support RTMP.

## 1.0.0-beta.5 (Dec 22, 2022)
- Added interfaces to support applying filters to camera feed using external video source.

## v1.0.0-beta.4 (Dec 16, 2022)
- Fixed an error in `SendbirdLive.authenticate()`.
- Fixed the bug that some filters of `LiveEventListQuery` didn't work.
- Added missing type declaration.
- Improved stability.

## v1.0.0-beta.3 (Oct 6, 2022)
- Added custom items to `LiveEvent`.
- Added `title` and `coverUrl` to `LiveEvent`.
- Added `LiveEvent.updateLiveEventInfo(params: LiveEventUpdateParams): Promise<void>`.
- Renamed `LiveEventConfiguration` to `LiveEventCreateParams`.
- Fixed wrong type definitions.

## v1.0.0-beta.2 (Jul 15, 2022)
- Fix ECMAScript error

## v1.0.0-beta.1 (Jul 15, 2022)
- Fix type declaration typo

## v1.0.0-beta (Jul 15, 2022)
- Initial beta release
