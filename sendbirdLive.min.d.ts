/** 1.2.0-beta.2 */
import { OpenChannel, OpenChannelModule } from "@sendbird/chat/openChannel";

/**
 * A class that provides media options that can be set when establishing a media stream for a live event.
 */
export declare interface MediaOption {
  /**
   * Indicates whether to turn on audio when the media streaming of host starts.
   */
  turnAudioOn: boolean;

  /**
   * Indicates whether to turn on video when the media streaming of host starts.
   */
  turnVideoOn: boolean;

  /**
   * A property that receives the stream from Sendbird Live SDK, delivers the stream to the external source for modification, and returns the modified stream to the Live SDK.
   */
  streamProcessor?: (stream: MediaStream) => MediaStream | Promise<MediaStream>;
}

type MediaAccessEventMap = {
  streamChanged: { args: [MediaStream] };
}

export declare interface MediaAccess extends EventTarget<MediaAccessEventMap> {
  /**
   * The MediaStream object of current local device.
   */
  stream: MediaStream;

  /**
   * Dispose this media access. Call this before unload the UI component to release the permission and resource.
   */
  dispose: () => void;
}

/**
 * An enum that provides option for the position of the overlaying camera stream
 */
export declare enum CameraOverlayPosition {
  /**
   * Place the host's video view at the top-left corner.
   */
  'TOP_LEFT' = 'top_left',

  /**
   * Place the host's video view at the top-right corner.
   */
  'TOP_RIGHT' = 'top_right',

  /**
   * Place the host's video view at the bottom-left corner.
   */
  'BOTTOM_LEFT' = 'bottom_left',

  /**
   * Place the host's video view at the bottom-right corner.
   */
  'BOTTOM_RIGHT' = 'bottom_right',

  /**
   * Hide the host's video view.
   */
    'HIDDEN' = 'hidden',
}

export declare interface ScreenShareOptions {
  cameraOverlayPosition?: CameraOverlayPosition;
  frameRate?: number;
}

export enum StreamType {
  webrtc = 'webrtc',
  rtmp = 'rtmp',
}

export interface RTMPStream {
  rtmpStreamId: string,
  rtmpHostUrl: string,
  streamKey: string,
  createdAt: number,
}

/**
 * A class that provides general information about a host in a live event.
 */
export declare interface Host {

  /**
   * The unique ID of the host. Host ID is generated each time the user enters a live event as a host.
   */
  hostId: string;

  /**
   * The unique ID of the user.
   */
  userId: string;

  /**
   * The nickname of the user.
   */
  nickname: string;

  /**
   * The profile image of the user.
   */
  profileURL: string;

  /**
   * Timestamp when the host entered the live event.
   */
  enteredAt?: number;

  /**
   * Timestamp when the host was connected to the live event.
   */
  connectedAt?: number;

  /**
   * Timestamp when the host was disconnected from the live event.
   */
  disconnectedAt?: number;

  /**
   * Timestamp when the host exited the live event.
   */
  exitedAt?: number;

  /**
   * The period from the time when the host entered the live event to the time the host exited the live event.
   */
  duration: number;

  /**
   * Indicates whether the host has turned on their audio.
   */
  isAudioOn: boolean;
  /**
   * Indicates whether the host has turned on their video.
   */
  isVideoOn: boolean;

  /**
   * The state of the host. Valid values are the following: entered, connected, disconnected, and exited.
   */
  state: HostState;

  /**
   * The unique ID of the live event.
   */
  liveEventId: string;

  /**
   * The type of technology that is being used for streaming. Valid values are the following: rtmp, webrtc.
   */
  streamType: StreamType;
  rtmpStream: RTMPStream;

}

/**
 * A class that provides general information about a participant in a live event.
 */
export declare interface Participant {

  /**
   * The unique ID of the participant. Participant ID is generated each time the user enters a live event.
   */
  participantId: string;

  /**
   * The unique ID of the user.
   */
  userId: string;

  /**
   * The nickname of the user.
   */
  nickname: string;

  /**
   * The profile image of the user.
   */
  profileURL: string;

  /**
   * Timestamp when the participant entered the live event.
   */
  enteredAt?: number;

  /**
   * Timestamp when the participant exited the live event.
   */
  exitedAt?: number;

  /**
   * The period from the time when the participant entered the live event to the time the participant exited the live event.
   */
  duration: number;

  /**
   * The state of the participant. Valid values are entered and exited.
   */
  state: ParticipantState;

  /**
   * The unique ID of the live event.
   */
  liveEventId: string;

}

export declare interface LiveUser extends Partial<Host>, Partial<Participant> {
  isHost: boolean;
  liveUserId: string;
  state: HostState & ParticipantState;
}

interface InitParams {
  appId: string,
  chatInstance?: SendbirdChat & { openChannel: OpenChannelModule };
}

/**
 * A object that provides configuration information for a live event when it is created.
 */
export declare interface LiveEventCreateParams {
  /**
   * An array of the user IDs of the users who can be host for a live event. This property can have up to 10 user IDs.
   */
  userIdsForHost?: string[];

  /**
   * The type of a live event.
   */
  type: LiveEventType;

  /**
   * The name of a live event.
   */
  title?: string;

  /**
   * The URL of the thumbnail image used for a live event.
   */
  coverUrl?: string;

  /**
   * The thumbnail image file used for a live event.
   */
  coverFile?: File;

  // customType?: string;

  /**
   * A unique key-value pair of information stored in a live event.
   */
  customItems?: CustomItems;
}

/**
 * A object that provides information for configuring a live event when it is updated.
 */
export declare interface LiveEventUpdateParams {
  /**
   * An array of the user IDs of the users who can be host for a live event. This property can have up to 10 user IDs.
   */
  userIdsForHost?: string[];

  /**
   * The name of a live event.
   */
  title?: string;

  /**
   * The URL of the thumbnail image used for a live event.
   */
  coverUrl?: string;

  /**
   * The thumbnail image file used for a live event.
   */
  coverFile?: File;

  // customType?: string;
}

/**
 * A object that provides parameters that are used to query a list of live events.
 */
export declare interface LiveEventListQueryParams {
  /**
   * Filters query results to include live events with the specified live event types.
   */
  types?: LiveEventType | LiveEventType[];

  /**
   * Filters query results to include live events with the specified live event state.
   */
  liveEventState?: LiveEventState;

  /**
   * Filters query results to include live events that were created within the specified ragne, in Unixmilliseconds.
   */
  createdAtRange?: [number | undefined, number | undefined];

  /**
   * Filters query results to include live events of which the number of current participants is within the specified range.
   */
  participantCountRange?: [number | undefined, number | undefined];

  /**
   * Filters query to include live events of which the duration is within the specified range.
   */
  durationRange?: [number | undefined, number | undefined];

  /**
   * Filters query to include live events with the specified live event IDs.
   */
  liveEventIds?: string[];

  /**
   * Filters query to include live events that were created by the specified user IDs.
   */
  createdByUserIds?: string[];

  /**
   * Sets the number of rooms to be retrieved at once.
   */
  limit?: number;
}

/**
 * An enum that provides information about roles that users can take in a live event.
 */
export declare enum LiveEventRole {
  /**
   * The user who is the host of the live event.
   */
  HOST = 'host',

  /**
   * The user who is the particiapnt of the live event.
   */
  PARTICIPANT = 'participant',
}

/**
 * An enum that provides information about the states of a live event.
 */
export declare enum LiveEventState {
  /**
   * Indicates a live event is created and host can enter.
   */
  CREATED = 'created',

  /**
   * Indicates a live event is ready to get started and participants can enter and chat.
   */
  READY = 'ready',

  /**
   * Indicates a live event is ongoing and participants can recieve media streaming of host.
   */
  ONGOING = 'ongoing',

  /**
   * Indicates a live event is `ongoing` but media streaming of host is disconnected.
   */
  PAUSED = 'paused',

  /**
   * Indicates a live event has ended.
   */
  ENDED = 'ended',
}


/**
 * An enum that provides information about the states of a host.
 */
export declare enum HostState {
  /**
   * Indicates that the host entered the live event.
   */
  ENTERED = 'entered',

  /**
   * Indicates that the host is connected to Sendbird server and media streaming of the host has started.
   */
  CONNECTED = 'connected',

  /**
   * Indicates that the host is disconnected from Sendbird server and media streaming of the host has ended.
   */
  DISCONNECTED = 'disconnected',

  /**
   * Indicates that the host left the live event.
   */
  EXITED = 'exited',
}

/**
 * An Enum that determines the type for LiveEvent
 */
export enum LiveEventType {
  LIVE_EVENT_FOR_VIDEO = 'live_event_for_video',
  LIVE_EVENT_FOR_AUDIO_ONLY = 'live_event_for_audio_only',
}


/**
 * An enum that provides information about the states of a participant.
 */
export declare enum ParticipantState {
  /**
   * Indicates that the participant entered the live event.
   */
  ENTERED = 'entered',

  /**
   * Indicates that the participant left the live event.
   */
  EXITED = 'exited',
}

/**
 * Participant count information of a live event.
 */
export interface ParticipantCountInfo {
  participantCount: number;
  peakParticipantCount: number;
  cumulativeParticipantCount: number;
}

export declare interface CustomItems {
  [key: string]: string;
}

export interface ConnectionMetrics {
  packetsLostRate?: number;
  rtt?: number;
  jitter?: number;
}

export declare type LiveEventEventMap = {
  /**
   * Invoked when a host has muted the audio.
   */
  hostMutedAudio: { args: [LiveEvent, Host] };

  /**
   * Invoked when a host has ummuted the audio.
   */
  hostUnmutedAudio: { args: [LiveEvent, Host] };

  /**
   * Invoked when a host has turned on the video.
   */
  hostStartedVideo: { args: [LiveEvent, Host] };

  /**
   * Invoked when a host has turned off the video.
   */
  hostStoppedVideo: { args: [LiveEvent, Host] };

  /**
   * Invoked when the live event is ready.
   */
  liveEventReady: { args: [LiveEvent] };

  /**
   * Invoked when a live event has started.
   */
  liveEventStarted: { args: [LiveEvent] };

  /**
   * Invoked when a live event has ended.
   */
  liveEventEnded: { args: [LiveEvent] };

  /**
   * Invoked when the live event information has been updated.
   */
  liveEventUpdated: { args: [LiveEvent] };

  /**
   * Invoked when the host has entered the live event.
   */
  hostEntered: { args: [LiveEvent, Host] };

  /**
   * Invoked when the host has exited the live event.
   */
  hostExited: { args: [LiveEvent, Host] };

  /**
   * Invoked when the host has been connected to the live event.
   */
  hostConnected: { args: [LiveEvent, Host] };

  /**
   * Invoked when the host has been disconnected from the live event.
   */
  hostDisconnected: { args: [LiveEvent, Host] };

  /**
   * Invoked when the participant count has been changed.
   */
  participantCountChanged: { args: [LiveEvent, ParticipantCountInfo] };

  /**
   * Invoked when the custom items in a live event has been updated.
   */
  customItemsUpdated: { args: [CustomItems, number] };

  /**
   * Invoked when the custom items in a live event has been deleted.
   */
  customItemsDeleted: { args: [CustomItems, number] };

  /**
   * Invoked when a user has been disconnected from the live event due to the given error.
   */
  exited: { args: [LiveEvent, Error] };
}

declare interface Event {
  readonly args?: any[];
}

declare type nullish = null | undefined;

declare type ArgsType<T extends Event> = T['args'] extends nullish
  ? []
  : T['args'];

declare interface EventListener<T extends Event> {
  (...args: ArgsType<T>): void;
}

declare type EventMap = Record<string, Event>

declare type EventKey<T extends EventMap> = keyof T;

declare class EventTarget<T extends EventMap> {
  protected _listeners: {
    [K in EventKey<T>]?: EventListener<T[K]>[];
  };
  addEventListener<K extends EventKey<T>>(type: K, callback: EventListener<T[K]>): () => void;
  on: <K extends keyof T>(type: K, callback: EventListener<T[K]>) => () => void;
  once<K extends EventKey<T>>(type: K, givenCb: EventListener<T[K]>): () => void;
  removeEventListener<K extends EventKey<T>>(type: K, callback: EventListener<T[K]>): void;
  off: <K extends keyof T>(type: K, callback: EventListener<T[K]>) => void;
  removeAllEventListeners(): void;
  protected _dispatchEvent<K extends EventKey<T>>(type: K, ...args: ArgsType<T[K]>): void;
}

export declare class LiveEvent extends EventTarget<LiveEventEventMap> {
  /**
   * An open channel that is used for the live event.
   */
  openChannel: OpenChannel;

  /**
   * Unique identifier for the live event.
   */
  liveEventId: string;

  /**
   * Host of the live event.
   */
  hosts: Host[];

  userIdsForHost: string[];

  /**
   * The type of live event.
   */
  type: LiveEventType;

  /**
   * The state of a live event. Valid values are created, ready, ongoing, and ended.
   */
  state: LiveEventState;

  /**
   * Indicates whether the host is streaming media.
   */
  isHostStreaming: boolean;

  /**
   *
   */
  currentLiveUser: LiveUser;

  /**
   * The timestamp of when the live event was created, in miliseconds.
   */
  createdAt: number;
  /**
   * The timestamp of when the live event was set ready, in miliseconds.
   */
  setReadyAt: number;
  /**
   * The timestamp of when the live event was started, in miliseconds.
   */
  startedAt: number;
  /**
   * The timestamp of when the live event was ended, in miliseconds.
   */
  endedAt: number;

  /**
   * User ID of the user that created the live event.
   */
  createdBy: string;
  /**
   * User ID of the user that set the live event ready.
   */
  setReadyBy: string;
  /**
   * User ID of the user that started the live event.
   */
  startedBy: string;
  /**
   * User ID of the user that ended the live event.
   */
  endedBy: string;

  /**
   * The period from the time when the live event was created to the time the live event was ended.
   */
  duration: number;

  /**
   * The number of participants in a live event which is counted by the number of devices and browsers concurrently connected to Sendbird server.
   */
  participantCount: number;
  /**
   * The highest number of `participantCount` measured at a given time during a live event.
   */
  peakParticipantCount: number;
  /**
   * The sum of all participants that entered and exited a live event.
   */
  cumulativeParticipantCount: number;

  /**
   * The name of a live event.
   */
  title: string;

  /**
   * The thumbnail image used for a live event.
   */
  coverUrl: string;

  /**
   * The role of the user in a live event.
   */
  get myRole(): LiveEventRole;

  get isHost(): boolean;

  get isActiveHost(): boolean;

  get isAudioOnly(): boolean;

  /**
   * A unique key-value pair of information stored in a live event.
   */
  get customItems(): CustomItems;

  fetchOpenChannel(): Promise<any>;

  /**
   * Enters a live event as a host. Only the host can perform this action.
   */
  enterAsHost(mediaOption: MediaOption): Promise<void>;

  /**
   * Sets a live event ready before starting a live event. Only the host can perform this action.
   */
  setEventReady(): Promise<void>;

  /**
   * Starts the live event. Only the host can perform this action. Calling this method implicitly calls `startStreaming()`.
   */
  startEvent(mediaOption: MediaOption): Promise<void>;

  /**
   * Starts media streaming of a host in the live event. Only the host can perform this action.
   */
  startStreaming(mediaOption: MediaOption): Promise<void>;

  /**
   * Ends media streaming of a host in the live event. Only the host can perform this action.
   */
  endStreaming(): Promise<void>;

  /**
   * Exits a live event as a host.
   */
  exitAsHost(): Promise<void>;

  /**
   * Ends a live event. Only the host can perform this action. Calling this method implicitly calls `endStreaming()`.
   */
  endEvent(): Promise<void>;

  /**
   * mutes the audio of a live event. Only the host can perform this action.
   */
  muteAudioInput(): void;

  /**
   * Unmutes the audio of a live event. Only the host can perform this action.
   */
  unmuteAudioInput(): void;

  /**
   * Turns off the video of a live event. Only the host can perform this action.
   */
  stopVideo(): void;

  /**
   * Turns on the video of a live event. Only the host can perform this action.
   */
  startVideo(): void;

  /**
   * Selects a device for audio input for a live event. Only the host can perform this action.
   */
  selectAudioInput(mediaDeviceInfo: InputDeviceInfo): void;

  /**
   * Selects a device for video input during a live event. Only the host can perform this action.
   */
  selectVideoInput(mediaDeviceInfo: InputDeviceInfo): void;

  /**
   * Enters a live event.
   */
  enter(): Promise<void>;

  /**
   * Exits a live event.
   */
  exit(): Promise<void>;

  /**
   * @deprecated
   */
  setVideoViewForLiveEvent(mediaView: HTMLMediaElement, hostId: string): void;

  setMediaViewForLiveEvent(mediaView: HTMLMediaElement, hostId: string): void;

  /**
   * Updates live event information. Only the host can perform this action.
   */
  updateLiveEventInfo(params: LiveEventUpdateParams): Promise<void>;

  /**
   * Retrieves the latest custom items of a live event.
   */
  fetchCustomItems(): Promise<CustomItems>;

  /**
   * Updates custom items in a live event.
   */
  updateCustomItems(customItems: CustomItems): Promise<{ customItems: CustomItems; updatedAt: number; }>;

  /**
   * Deletes custom items in a live event by specifying keys.
   */
  deleteCustomItems(customItemKeys: string[]): Promise<{ customItems: CustomItems; deletedAt: number; }>;

  /**
   * Deletes all custom items in a live event.
   */
  deleteAllCustomItems(): Promise<{ customItems: CustomItems, deletedAt: number; }>;

  /**
   * Starts streaming using an external video source instead of the default camera on a device.
   */
  startUsingExternalVideo(streamProcessor: (stream: MediaStream) => MediaStream | Promise<MediaStream>): Promise<void>;

  /**
   * Stops streaming using an external video source and returns to the default camera to stream. You can set another camera to stream by specifying the device on `selectVideoDevice()`.
   */
  stopUsingExternalVideo(): void;

  /**
   * Creates a new RTMP stream. This creates a new RTMP endpoint that you can use as an input for media stream for the live event. A host will be created with the stream type of RTMP and entered to the live event as the host.
   */
  createRTMPStream(): Promise<RTMPStream>;

  /**
   * Deletes the existing RTMP stream. This will exit the existing host with the RTMP stream type.
   */
  deleteRTMPStream(rtmpStreamId: string): Promise<void>;

  /**
   * Starts screen sharing. The screen will show both the shared screen and the host's video view. The position of the host's video view can be configured by the `CameraOverlayPosition` enum.
   */
  startScreenShare(options?: ScreenShareOptions): Promise<void>;

  /**
   * Stops screen sharing.
   */
  stopScreenShare(): void;

  /**
   * Sets screen share options.
   */
  setScreenShareOptions(options: ScreenShareOptions): void;

  setConnectionQualityListener(listener: (hostId: string, metric: ConnectionMetrics) => void): void;

  removeConnectionQualityListener(): void;
}

/**
 * A query class that provides queries used to retrieve a list of live events.
 */
export declare class LiveEventListQuery {
  /**
   * Indicates whether a query is loading.
   */
  isLoading: boolean;

  /**
   * Indicates whether there are previous live events to be queried.
   */
  get hasPrev(): boolean;

  /**
   * Indicates whether there are more live events to be queried.
   */
  get hasNext(): boolean;

  /**
   * Retrieves a list of live events after the last result set.
   */
  next(): Promise<LiveEvent[]>;

  /**
   * Retrieves the list of live events prior to the last result set.
   */
  prev(): Promise<LiveEvent[]>;
}


declare class SendbirdLiveMain {
  /**
   * Initializes Sendbird Live SDK with the app ID of a Sendbird application.
   */
  init(params: InitParams): void;

  /**
   * Sets logger level.
   */
  setLoggerLevel(level: LEVELS): LEVELS;

  /**
   * Authenticates a user with the user ID and access token to connect to Sendbird server.
   */
  authenticate(userId: string, accessToken?: string): Promise<void>;

  /**
   * Deauthenticates a user to disconnect from Sendbird server.
   */
  deauthenticate(): Promise<void>;

  /**
   * Creates a live event.
   */
  createLiveEvent(config: LiveEventCreateParams): Promise<LiveEvent>;

  /**
   * Returns a live event by its URL.
   */
  getLiveEvent(liveEventId: string): Promise<LiveEvent>;

  /**
   * Creates a query for a list of all live events. A list of live events in a specific state can be queried by specifying a state in `LiveEventListQueryParams`.
   */
  createLiveEventListQuery(params: LiveEventListQueryParams): LiveEventListQuery;

  useMedia(constraints: MediaConstraints): MediaAccess;

  updateMediaDevices(constraints: { audio: boolean; video: boolean }): void;

  getCurrentAudioInputDevice(): InputDeviceInfo;

  getAvailableAudioInputDevices(): InputDeviceInfo[];

  selectAudioInput(mediaDeviceInfo: InputDeviceInfo): void;

  setAudioInputDeviceChanged(listener: (currentAudioInputDevice: InputDeviceInfo, availableAudioInputDevices: InputDeviceInfo[]) => void): () => void;

  getCurrentVideoInputDevice(): InputDeviceInfo;

  getAvailableVideoInputDevices(): InputDeviceInfo[];

  selectVideoInput(mediaDeviceInfo: InputDeviceInfo): void;

  setVideoInputDeviceChanged(listener: (currentVideoInputDevice: InputDeviceInfo, availableVideoInputDevices: InputDeviceInfo[]) => void): () => void;
}

export declare enum ErrorCode {
  ERR_REQUEST_FAILED = 1800200,
  ERR_WEBSOCKET_CONNECTION_NOT_OPENED = 1800201,
  ERR_WEBSOCKET_CONNECTION_FAILED = 1800202,
  ERR_NO_RESPONSE_DUE_TO_TIMEOUT = 1800203,
  ERR_REQUEST_FAILED_DUE_TO_WEBSOCKET_CONNECTION_LOST = 1800204,
  ERR_WRONG_RESPONSE = 1800205,
  ERR_QUERY_IN_PROGRESS = 1800206,
  INTERNAL_SERVER_ERROR = 1800207,
  ERR_MALFORMED_DATA = 1800208,

  LIVE_EVENT_ID_NOT_FOUND = 2800100,
  ACTION_NOT_ALLOWED_IN_CURRENT_STATE = 2800101,
  ACTION_NOT_ALLOWED_FOR_PARTICIPANT = 2800102,
  USER_NOT_ENTERED_LIVE_EVENT = 2800103,
  STREAM_NOT_STARTED = 2800104,
  CONNECTION_TO_MEDIA_STREAM_FAILED = 2800105,
  ACTION_NOT_ALLOWED_IN_CURRENT_HOST_TYPE = 2800107,
  UNKNOWN_NETWORK_ERROR = 2800400,
  QUERY_IN_PROGRESS = 2800900,
  OPEN_CHANNEL_NOT_FETCHED = 2800901,
}

declare export const SendbirdLive: SendbirdLiveMain;
