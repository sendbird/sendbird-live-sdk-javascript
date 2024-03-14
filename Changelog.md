# Change Log

### 1.2.2 (Mar 14, 2024)
- Improved WebRTC internal logging

### 1.2.1 (Dec 11, 2023)
- Added `resolutionChanged` in `LiveEventEventMap` to monitor changes in video resolution.

### 1.2.0 (Dec 2, 2023)
- Added support for streaming with multiple hosts
  - Now, multiple hosts can stream in a live event simultaneously.
  - `LiveEvent.hostType` has changed to `LiveEvent.type`
  - LiveEventType can have following values: `LIVE_EVENT_FOR_AUDIO_ONLY` and `LIVE_EVENT_FOR_VIDEO`, indicating the live event type for audio-only streaming and video streaming, respectively.
  - `LiveEventCreateParams.hostType` has changed to `LiveEventCreateParams.type`
  - `LiveEventListQueryParams.hostTypes` has changed to `LiveEventListQueryParams.types`
- The existing `disconneted` event of `LiveEvent` is now renamed to `exited` event.


### 1.2.0-beta.2 (Nov 29, 2023)
- Fixed wrong type declarations.
- Fixed the bug that `LiveEvent.type` is `undefined` sometimes.
- Fixed the bug that a client can enter in the same live event.
- Fixed the bug that microphone/camera streams are not correctly disposed after exiting the live event.

### 1.2.0-beta.1 (Nov 8, 2023)
- Added support for streaming with multiple hosts
  - Now, multiple hosts can stream in a live event simultaneously.
  - `LiveEvent.hostType` has changed to `LiveEvent.type`
  - LiveEventType can have following values: `LIVE_EVENT_FOR_AUDIO_ONLY` and `LIVE_EVENT_FOR_VIDEO`, indicating the live event type for audio-only streaming and video streaming, respectively.
  - `LiveEventCreateParams.hostType` has changed to `LiveEventCreateParams.type`
  - `LiveEventListQueryParams.hostTypes` has changed to `LiveEventListQueryParams.types`
- The existing `disconneted` event of `LiveEvent` is now renamed to `exited` event.

### 1.1.1 (Sep 7, 2023)
- Added missing export of `HostType`

### 1.1.0 (Sep 7, 2023)

## Sendbird Live SDK is now out of beta.

## Introducing Audio Only Live Events.
You can stream live events with audio only, without having to turn the video on.
- Added `hostType` to `LiveEvent`
    - `SINGLE_HOST`: live event in which one host can stream video and audio at a time.
    - `SINGLE_HOST_AUDIO_ONLY`: live event in which one host can stream only audio at a time.
    - When creating or retrieving a list of live events, you must specify the type of the live event by providing a `hostType` variable.
- Added `hostType` to `LiveEventCreateParams`
- Added `hostTypes` to `LiveEventListQueryParams`

## Breaking Changes
- `participantEntered` and `participantExited` in `LiveEventEventMap` have been removed due to the excessive number of events they triggered when numerous participants joined the live event
    - Instead, use `participantCountChanged` to track the change of participant counts in a live event. This event will not be called every time a new participant joins the live event. Instead, it will be called periodically depending on the total number of participants joining the live event.
- `LiveEvent.setVideoViewForLiveEvent()` is renamed to `LiveEvent.setMediaViewForLiveEvent()`. It can accept `HTMLAudioElement` as a parameter, not only `HTMLVideoElement`.

### 1.0.0-beta.11 (Aug 3, 2023)
- Fixed the bug that the user can't enter the `liveEvent` as a host if the user id contains spaces.

### v1.0.0-beta.10 (May 25, 2023)
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
