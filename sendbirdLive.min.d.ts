/** v1.0.0-beta.9 */
import { StreamType } from "./liveEvent/host";

export declare interface MediaOption {
  turnAudioOn: boolean;
  turnVideoOn: boolean;
  streamProcessor?: (stream: MediaStream) => MediaStream | Promise<MediaStream>;
}

export declare enum CameraOverlayPosition {
  'TOP_LEFT' = 'top_left',
  'TOP_RIGHT' = 'top_right',
  'BOTTOM_LEFT' = 'bottom_left',
  'BOTTOM_RIGHT' = 'bottom_right',
  'HIDDEN' = 'hidden',
}

export declare interface ScreenShareOptions {
  cameraOverlayPosition?: CameraOverlayPosition;
  frameRate?: number;
}

export interface RTMPStream {
  rtmpStreamId: string,
  rtmpHostUrl: string,
  streamKey: string,
  createdAt: number,
}

export declare interface Host {

  hostId: string;
  userId: string;
  nickname: string;
  profileURL: string;

  enteredAt?: number;
  connectedAt?: number;
  disconnectedAt?: number;
  exitedAt?: number;
  duration: number;

  isAudioOn: boolean;
  isVideoOn: boolean;

  state: HostState;
  liveEventId: string;
  streamType: StreamType;
  rtmpStream: RTMPStream;

}

export declare interface Participant {

  participantId: string;
  userId: string;
  nickname: string;
  profileURL: string;

  enteredAt?: number;
  exitedAt?: number;
  duration: number;

  state: ParticipantState;

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

export declare interface LiveEventCreateParams {
  userIdsForHost?: string[];
  // hostType: HostType;

  title?: string;
  coverUrl?: string;
  coverFile?: File;
  customType?: string;
  customItems?: CustomItems;
}

export declare interface LiveEventUpdateParams {
  userIdsForHost?: string[];
  // hostType: HostType;

  title?: string;
  coverUrl?: string;
  coverFile?: File;
  customType?: string;
}

export declare interface LiveEventListQueryParams {
  // hostType: HostType;
  liveEventState?: LiveEventState;

  createdAtRange?: [number | undefined, number | undefined];
  participantCountRange?: [number | undefined, number | undefined];
  durationRange?: [number | undefined, number | undefined];

  liveEventIds?: string[];
  createdByUserIds?: string[];

  limit?: number;
}

export declare enum LiveEventRole {
  HOST = 'host',
  PARTICIPANT = 'participant',
}

export declare enum LiveEventState {
  CREATED = 'created',
  READY = 'ready',
  ONGOING = 'ongoing',
  PAUSED = 'paused',
  ENDED = 'ended',
}

export declare enum HostState {
  ENTERED = 'entered',
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  EXITED = 'exited',
}

export declare enum ParticipantState {
  ENTERED = 'entered',
  EXITED = 'exited',
}

export declare interface CustomItems {
  [key: string]: string;
}

export declare type LiveEventEventMap = {
  hostMutedAudio: { args: [LiveEvent, Host] };
  hostUnmutedAudio: { args: [LiveEvent, Host] };
  hostStartedVideo: { args: [LiveEvent, Host] };
  hostStoppedVideo: { args: [LiveEvent, Host] };
  liveEventReady: { args: [LiveEvent] };
  liveEventStarted: { args: [LiveEvent] };
  liveEventEnded: { args: [LiveEvent] };
  liveEventUpdated: { args: [LiveEvent] };
  hostEntered: { args: [LiveEvent, Host] };
  hostExited: { args: [LiveEvent, Host] };
  hostConnected: { args: [LiveEvent, Host] };
  hostDisconnected: { args: [LiveEvent, Host] };
  participantEntered: { args: [LiveEvent, Participant] };
  participantExited: { args: [LiveEvent, Participant] };
  customItemsUpdated: { args: [CustomItems, number] };
  customItemsDeleted: { args: [CustomItems, number] };
  disconnected: { args: [LiveEvent, Error] };
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
  host: Host;
  userIdsForHost: string[];

  /**
   * The state of a live event. Valid values are created, ready, ongoing, and ended.
   */
  state: LiveEventState;
  /**
   * Indicates whether the host is streaming media.
   */
  isHostStreaming: boolean;

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

  get myRole(): LiveEventRole;

  get isHost(): boolean;

  get isActiveHost(): boolean;

  get customItems(): CustomItems;

  fetchOpenChannel(): Promise<any>;

  enterAsHost(mediaOption: MediaOption): Promise<void>;

  setEventReady(): Promise<void>;

  startEvent(mediaOption: MediaOption): Promise<void>;

  startStreaming(mediaOption: MediaOption): Promise<void>;

  endStreaming(): Promise<void>;

  exitAsHost(): Promise<void>;

  endEvent(): Promise<void>;

  muteAudioInput(): void;

  unmuteAudioInput(): void;

  stopVideo(): void;

  startVideo(): void;

  selectAudioInput(mediaDeviceInfo: InputDeviceInfo): void;

  selectVideoInput(mediaDeviceInfo: InputDeviceInfo): void;

  enter(): Promise<void>;

  exit(): Promise<void>;

  setVideoViewForLiveEvent(mediaView: HTMLMediaElement, hostId: string): void;

  updateLiveEventInfo(params: LiveEventUpdateParams): Promise<void>;

  fetchCustomItems(): Promise<CustomItems>;

  updateCustomItems(customItems: CustomItems): Promise<{ customItems: CustomItems; updatedAt: number; }>;

  deleteCustomItems(customItemKeys: string[]): Promise<{ customItems: CustomItems; deletedAt: number; }>;

  deleteAllCustomItems(): Promise<{ customItems: CustomItems, deletedAt: number; }>;

  startUsingExternalVideo(streamProcessor: (stream: MediaStream) => MediaStream | Promise<MediaStream>): Promise<void>;

  stopUsingExternalVideo(): void;

  createRTMPStream(): Promise<RTMPStream>;

  deleteRTMPStream(): Promise<void>;

  startScreenShare(options?: ScreenShareOptions): Promise<void>;

  stopScreenShare(): void;

  setScreenShareOptions(options: ScreenShareOptions): void;
}

export declare class LiveEventListQuery {
  isLoading: boolean;

  get hasPrev(): boolean;

  get hasNext(): boolean;

  next(): Promise<LiveEvent[]>;

  prev(): Promise<LiveEvent[]>;
}


declare class SendbirdLiveMain {
  init(params: InitParams): void;

  setLoggerLevel(level: LEVELS): LEVELS;

  authenticate(userId: string, accessToken?: string): Promise<void>;

  deauthenticate(): Promise<void>;

  createLiveEvent(config: LiveEventCreateParams): Promise<LiveEvent>;

  getLiveEvent(liveEventId: string): Promise<LiveEvent>;

  createLiveEventListQuery(params: LiveEventListQueryParams): LiveEventListQuery;

  useMedia(constraints: MediaConstraints);

  updateMediaDevices(constraints: { audio: boolean; video: boolean }): void;

  getCurrentAudioInputDevice(): InputDeviceInfo;

  getAvailableAudioInputDevices(): InputDeviceInfo[];

  selectAudioInput(mediaDeviceInfo: InputDeviceInfo): void;

  getCurrentVideoInputDevice(): InputDeviceInfo;

  getAvailableVideoInputDevices(): InputDeviceInfo[];

  selectVideoInput(mediaDeviceInfo: InputDeviceInfo): void;
}

export declare enum ErrorCode {
  LIVE_EVENT_ID_NOT_FOUND = 2800100,
  ACTION_NOT_ALLOWED_IN_CURRENT_STATE = 2800101,
  ACTION_NOT_ALLOWED_FOR_PARTICIPANT = 2800102,
  USER_NOT_ENTERED_LIVE_EVENT = 2800103,
  STREAM_NOT_STARTED = 2800104,
  CONNECTION_TO_MEDIA_STREAM_FAILED = 2800105,
  UNKNOWN_NETWORK_ERROR = 2800400,
  QUERY_IN_PROGRESS = 2800900,
  OPEN_CHANNEL_NOT_FETCHED = 2800901,
}

declare export const SendbirdLive: SendbirdLiveMain;
