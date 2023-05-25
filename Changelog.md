# Change Log

## v1.0.0-beta.10 (May 25, 2023)
- Added interfaces to get network statistics from ongoing live events.
    - Added `setConnectionQualityListener(listener: (hostId: string, metric: ConnectionMetrics) => void): void;`
    - Added `removeConnectionQualityListener(): void;`

### 1.0.0-beta.9 (May 16, 2023 UTC)
* Fixed the error during updating `customItems`.
* Added missing type declarations.

### 1.0.0-beta.8 (Mar 24, 2023 UTC)
* Improved screen share feature
    * Prevent the high CPU usage problem if `frameRate` is too high for the current device resource.
* Fixed wrong type declaration for `useMedia(constraints: MediaConstraints)`
* Improved device settings APIs
    * Added `updateMediaDevices(constraints: MediaConstraints)`.
    * Added `setAudioInputDeviceChanged(listener: (currentAudioInputDevice: InputDeviceInfo, availableAudioInputDevices: InputDeviceInfo[]) => void)`.
    * Added `setVideoInputDeviceChanged(listener: (currentVideoInputDevice: InputDeviceInfo, availableVideoInputDevices: InputDeviceInfo[]) => void)`.

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
