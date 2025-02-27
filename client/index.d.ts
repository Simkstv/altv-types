/// <reference types="@altv/types-shared"/>
/// <reference lib="es2017.sharedmemory"/>
/**
 * @module alt-client
 */
declare module "alt-client" {
  import * as shared from "alt-shared";

  export const enum Locale {
    Arabic = "ar",
    Belarusian = "by",
    Czech = "cz",
    German = "de",
    English = "en",
    Spanish = "es",
    Farsi = "fa",
    French = "fr",
    Hebrew = "he",
    Hungarian = "hu",
    Indonesian = "id",
    Hindi = "in_hd", // Wrong tag (hi_in)
    Malayalam = "in_ml", // Wrong tag (ml_in)
    Telugu = "in_tl", // Wrong tag (te_in)
    Tamil = "in_tm", // Wrong tag (ta_in)
    Italian = "it",
    Lithuanian = "lt",
    Latvian = "lv",
    NorwegianBokmal = "nb_no",
    NorwegianNynorsk = "nn_no",
    Polish = "pl",
    Portugese = "pt",
    BrazilianPortuguese = "pt_br",
    Romanian = "ro",
    Serbian = "rs", // Wrong tag (sr)
    Russian = "ru",
    Slovak = "sk",
    Thai = "th",
    Turkish = "tr",
    Ukrainian = "ua", // Wrong tag (uk)
    ChineseSimplified = "zh_cn",
    ChineseTraditional = "zh_tw",
  }

  export const enum Permission {
    None,
    ScreenCapture,
    WebRTC,
    All,
  }

  export const enum PermissionState {
    Allowed,
    Denied,
    Unspecified,
    Failed,
  }

  export const enum StatName {
    Stamina = "stamina",
    Strength = "strength",
    LungCapacity = "lung_capacity",
    Wheelie = "wheelie_ability",
    Flying = "flying_ability",
    Shooting = "shooting_ability",
    Stealth = "stealth_ability",
  }

  export const enum CheckpointType {
    CylinderSingleArrow,
    CylinderDoubleArrow,
    CylinderTripleArrow,
    CylinderCycleArrow,
    CylinderCheckerboard,
    CylinderWrench,
    CylinderSingleArrow2,
    CylinderDoubleArrow2,
    CylinderTripleArrow2,
    CylinderCycleArrow2,
    CylinderCheckerboard2,
    CylinderWrench2,
    RingSingleArrow,
    RingDoubleArrow,
    RingTripleArrow,
    RingCycleArrow,
    RingCheckerboard,
    SingleArrow,
    DoubleArrow,
    TripleArrow,
    CycleArrow,
    Checkerboard,
    CylinderSingleArrow3,
    CylinderDoubleArrow3,
    CylinderTripleArrow3,
    CylinderCycleArrow3,
    CylinderCheckerboard3,
    CylinderSingleArrow4,
    CylinderDoubleArrow4,
    CylinderTripleArrow4,
    CylinderCycleArrow4,
    CylinderCheckerboard4,
    CylinderSingleArrow5,
    CylinderDoubleArrow5,
    CylinderTripleArrow5,
    CylinderCycleArrow5,
    CylinderCheckerboard5,
    RingPlaneUp,
    RingPlaneLeft,
    RingPlaneRight,
    RingPlaneDown,
    Empty,
    Ring,
    Empty2,
    Cylinder,
    Cylinder1,
    Cylinder2,
    Cylinder3,
    Cylinder4,
    Cylinder5,
    Empty3,
    Empty4,
    Empty5,
    Empty6,
    RingDollar,
    RingWolf,
    RingQuestionMark,
    RingPlane,
    RingChopper,
    RingBoat,
    RingCar,
    RingBike,
    RingBicycle,
    RingTruck,
    RingParachute,
    RingJetpack,
    RingWhirl,
  }

  export const enum VehicleIndicatorLights {
    BlinkLeft = 1,
    BlinkRight = 2,
    BlinkPermBoth = 4,
    StaticBoth = 8,
    Interior = 64,
  }

  export const enum WebSocketReadyState {
    Connecting,
    Open,
    Closing,
    Closed,
  }

  export const enum ConfigFlag {
    DisableAutoWeaponSwap = "DISABLE_AUTO_WEAPON_SWAP",
    DisablePedPropKnockOff = "DISABLE_PED_PROP_KNOCK_OFF",
    DisableIdleCamera = "DISABLE_IDLE_CAMERA",
  }

  export const enum WatermarkPosition {
    BottomRight = 0,
    TopRight = 1,
    TopLeft = 2,
    TopCenter = 3,
    BottomCenter = 4,
  }

  export const enum ProfileSourceType {
    Script = "script",
    Builtin = "builtins",
    Native = "native-callback",
    Internal = "internal",
    Unknown = "unknown",
  }

  export interface IClientEvent {
    anyResourceError: (resourceName: string) => void;
    anyResourceStart: (resourceName: string) => void;
    anyResourceStop: (resourceName: string) => void;
    changedVehicleSeat: (vehicle: Vehicle, oldSeat: number, seat: number) => void;
    connectionComplete: () => void;
    consoleCommand: (name: string, ...args: string[]) => void;
    disconnect: () => void;
    enteredVehicle: (vehicle: Vehicle, seat: number) => void;
    gameEntityCreate: (entity: Entity) => void;
    gameEntityDestroy: (entity: Entity) => void;
    keydown: (key: number) => void;
    keyup: (key: number) => void;
    leftVehicle: (vehicle: Vehicle, seat: number) => void;
    removeEntity: (object: Entity) => void;
    resourceStart: (errored: boolean) => void;
    resourceStop: () => void;
    resourceError: (error: Error, file: string, line: number) => void;
    syncedMetaChange: (entity: Entity, key: string, value: any, oldValue: any) => void;
    streamSyncedMetaChange: (entity: Entity, key: string, value: any, oldValue: any) => void;
    globalMetaChange: (key: string, value: any, oldValue: any) => void;
    globalSyncedMetaChange: (key: string, value: any, oldValue: any) => void;
    /**
     * @remarks See https://alloc8or.re/gta5/doc/enums/eTaskTypeIndex.txt for task ids.
     */
    taskChange: (oldTask: number, newTask: number) => void;
  }

  export interface IDiscordUser {
    readonly id: string;
    readonly name: string;
    readonly discriminator: string;
    readonly avatar: string;
  }

  /**
   * Vehicle handling, which affects how vehicle responds and reacts to the inputs of a driver.
   * This handling applies to particular vehicle instance, as opposed to the {@link HandlingData}.
   *
   * @remarks Changes will be reflected only on a particular instance of the vehicle. On creation, model handling will be used as a base and changed properties will be added on top of it.
   */
  export interface IVehicleHandling {
    readonly handlingNameHash: number;
    acceleration: number;
    antiRollBarBiasFront: number;
    antiRollBarBiasRear: number;
    antiRollBarForce: number;
    brakeBiasFront: number;
    brakeBiasRear: number;
    brakeForce: number;
    camberStiffness: number;
    centreOfMassOffset: shared.Vector3;
    clutchChangeRateScaleDownShift: number;
    clutchChangeRateScaleUpShift: number;
    collisionDamageMult: number;
    damageFlags: number;
    deformationDamageMult: number;
    downforceModifier: number;
    driveBiasFront: number;
    driveInertia: number;
    driveMaxFlatVel: number;
    engineDamageMult: number;
    handBrakeForce: number;
    handlingFlags: number;
    inertiaMultiplier: shared.Vector3;
    initialDragCoeff: number;
    initialDriveForce: number;
    initialDriveGears: number;
    initialDriveMaxFlatVel: number;
    lowSpeedTractionLossMult: number;
    mass: number;
    modelFlags: number;
    monetaryValue: number;
    oilVolume: number;
    percentSubmerged: number;
    percentSubmergedRatio: number;
    petrolTankVolume: number;
    rollCentreHeightFront: number;
    rollCentreHeightRear: number;
    seatOffsetDistX: number;
    seatOffsetDistY: number;
    seatOffsetDistZ: number;
    steeringLock: number;
    steeringLockRatio: number;
    suspensionBiasFront: number;
    suspensionBiasRear: number;
    suspensionCompDamp: number;
    suspensionForce: number;
    suspensionLowerLimit: number;
    suspensionRaise: number;
    suspensionReboundDamp: number;
    suspensionUpperLimit: number;
    tractionBiasFront: number;
    tractionBiasRear: number;
    tractionCurveLateral: number;
    tractionCurveLateralRatio: number;
    tractionCurveMax: number;
    tractionCurveMaxRatio: number;
    tractionCurveMin: number;
    tractionCurveMinRatio: number;
    tractionLossMult: number;
    tractionSpringDeltaMax: number;
    tractionSpringDeltaMaxRatio: number;
    unkFloat1: number;
    unkFloat2: number;
    unkFloat4: number;
    unkFloat5: number;
    weaponDamageMult: number;

    /**
     * Indicates whether vehicle handling was modified.
     *
     * @returns `true` if vehicle handling was modified; otherwise, `false`.
     */
    isModified(): boolean;

    /**
     * Resets the vehicle handling back to a model handling.
     */
    reset(): void;
  }

  export interface IHttpResponse {
    readonly statusCode: number;
    readonly body: string;
    readonly headers: Record<string, string>;
  }

  export interface IHeapStats {
    readonly heapSizeLimit: number;
    readonly totalHeapSize: number;
    readonly usedHeapSize: number;
    readonly mallocedMemory: number;
    readonly peakMallocedMemory: number;
  }

  export interface IProfile {
    readonly id: number;
    readonly type: string;
    readonly start: number;
    readonly end: number;
    readonly samples: number;
    readonly root: IProfileNode;
  }

  export interface IProfileNode {
    readonly id: number;
    readonly function: string;
    readonly source: string;
    readonly sourceType: ProfileSourceType;
    readonly line: number;
    readonly bailoutReason: string | null;
    readonly hitCount: number;
    readonly timestamp: number;
    readonly children: Array<IProfileNode> | null;
    readonly lineTicks: Array<ILineTick> | null;
  }

  export interface ILineTick {
    readonly line: number;
    readonly hitCount: number;
  }

  /** @beta */
  export class Audio extends shared.BaseObject {
    /**
     * Creates a new Audio instance.
     *
     * @param source The source url of the audio.
     * @param volume The volume of the audio. Ranges from 0 to 1.
     * @param category The category of the audio. Defaults to 'radio'.
     * @param play2D If the sound will be played in 2D, if false it will be 3D.
     */
    public constructor(source: string, volume: number, category?: shared.AudioCategory, play2D?: boolean);

    public source: string;

    public looped: boolean;

    public volume: number;

    public category: shared.AudioCategory;

    public readonly frontendPlay: boolean;

    public readonly currentTime: number;

    public readonly maxTime: number;

    public readonly playing: boolean;

    /**
     * @remarks This method has no effect if the {@link frontendPlay} property returns true.
     */
    public addOutput(entity: Entity | number): void;

    /**
     * @remarks This method has no effect if the {@link frontendPlay} property returns true.
     */
    public removeOutput(entity: Entity | number): void;

    /**
     * @remarks This method has no effect if the {@link frontendPlay} property returns true.
     */
    public getOutputs(): Array<Entity | number>;

    public play(): void;
    public pause(): void;
    public reset(): void;

    public seek(time: number): void;

    public on(event: "streamEnded", callback: () => void): void;
    public on(event: "error", callback: (code: number, message: string) => void): void;
  }

  export class WorldObject extends shared.BaseObject {
    /**
     * Object position
     */
    public pos: shared.Vector3;
  }

  export class Checkpoint extends WorldObject {
    public checkpointType: CheckpointType;
    public nextPos: shared.Vector3;
    public radius: number;
    public height: number;
    public color: shared.RGBA;

    constructor(type: CheckpointType, pos: shared.Vector3, nextPos: shared.Vector3, radius: number, height: number, rgbcolor: shared.RGBA);

    public isEntityIn(entity: Entity): boolean;
    public isPointIn(pos: shared.Vector3): boolean;
  }

  export class Entity extends WorldObject {
    /**
     * Array with all entities.
     *
     * @remarks This creates a clone of the array everytime it is called.
     * It is advised to call this once and store the result in a variable, before iterating over it.
     * @example
     * ```js
     * const entities = alt.Entity.all; // Store it in a variable, so it doesn't create a copy of the array on each iteration
     * for(let i = 0; i < entities.length; i++)
     * {
     *   alt.log(`${entities[i].id}`); // Logs the id of every entity
     * }
     * ```
     */
    public static readonly all: Array<Entity>;

    /** Entity unique id */
    public readonly id: number;

    /** Internal game id that can be used in native calls */
    public readonly scriptID: number;

    /**
     * Returns whether the entity is spawned in the game world.
     *
     * @remarks This does the same thing as checking if the {@link scriptID} is 0.
     */
    public readonly isSpawned: boolean;

    /** Hash of entity model */
    public readonly model: number;

    /**
     * Object position
     */
    public readonly pos: shared.Vector3;

    /** Entity rotation in radians */
    public readonly rot: shared.Vector3;

    public readonly visible: boolean;

    /**
     * Retrieves the entity from the pool.
     *
     * @param id The id of the entity.
     * @returns Entity if it was found, otherwise null.
     */
    public static getByID(id: number): Entity | null;

    /**
     * Retrieves the entity from the pool.
     *
     * @param scriptID The script id of the entity.
     * @returns Entity if it was found, otherwise null.
     */
    public static getByScriptID(scriptID: number): Entity | null;

    /**
     * Gets a value using the specified key.
     *
     * @param key The key of the value to get.
     * @returns Dynamic value associated with the specified key.
     */
    public getSyncedMeta(key: string): any;

    /**
     * Determines whether contains the specified key.
     *
     * @param key The key of the value to locate.
     * @returns Return is dependent on whether element associated with the specified key is stored.
     */
    public hasSyncedMeta(key: string): boolean;

    /**
     * Gets a value using the specified key.
     *
     * @param key The key of the value to get.
     * @returns Dynamic value associated with the specified key.
     */
    public getStreamSyncedMeta(key: string): any;

    /**
     * Determines whether contains the specified key.
     *
     * @param key The key of the value to locate.
     * @returns Return is dependent on whether element associated with the specified key is stored.
     */
    public hasStreamSyncedMeta(key: string): boolean;
  }

  export class Player extends Entity {
    /**
     * Array with all players.
     *
     * @remarks This creates a clone of the array everytime it is called.
     * It is advised to call this once and store the result in a variable, before iterating over it.
     * @example
     * ```js
     * const players = alt.Player.all; // Store it in a variable, so it doesn't create a copy of the array on each iteration
     * for(let i = 0; i < players.length; i++)
     * {
     *   alt.log(`${players[i].name}`); // Logs the name of every player
     * }
     * ```
     */
    public static readonly all: Array<Player>;

    /**
     * Array with all streamed in players.
     */
    public static readonly streamedIn: Array<Player>;

    /**
     * The local player instance.
     */
    public static readonly local: LocalPlayer;

    /** Player talking state */
    public readonly isTalking: boolean;

    /** Player talking volume */
    public readonly micLevel: number;

    /** Player name */
    public readonly name: string;

    /** Player's vehicle, null if player is not in any vehicle */
    public readonly vehicle: Vehicle | null;

    public readonly isDead: boolean;

    /**
     * Current weapon components.
     */
    public readonly currentWeaponComponents: Array<number>;

    /**
     * Tint index for currently equipped weapon.
     *
     * @alpha
     */
    //public readonly currentWeaponTintIndex: number;

    /**
     * Currently equipped weapon.
     */
    public readonly currentWeapon: number;

    /**
     * Is the player currently jumping.
     *
     * @alpha
     */
    //public readonly isJumping: boolean;

    /**
     * Is the player currently in ragdoll.
     */
    public readonly isInRagdoll: boolean;

    /**
     * Is the player currently aiming.
     *
     * @remarks
     * Returns ``true`` _ONLY_ if:
     *  - you are in first person with a gun equipped and you are not sprinting
     *  - you are in third person and aiming/shooting
     */
    public readonly isAiming: boolean;

    /**
     * Is the player currently shooting with a weapon.
     */
    //public readonly isShooting: boolean;

    /**
     * Is the player currently reloading their weapon.
     */
    //public readonly isReloading: boolean;

    /**
     * Current armour.
     */
    public readonly armour: number;

    /**
     * Max available armour value.
     */
    public readonly maxArmour: number;

    /**
     * Current player movement speed.
     */
    public readonly moveSpeed: number;

    /**
     * Position the player is currently aiming at.
     */
    public readonly aimPos: shared.Vector3;

    /**
     * Rotation of the head of the player.
     */
    public readonly headRot: shared.Vector3;

    /**
     * Curent seat the player is sitting in.
     */
    public readonly seat: number;

    /**
     * The entity the player is aiming at.
     */
    public readonly entityAimingAt: Entity | null;

    /**
     * The current aim offset of the player.
     */
    public readonly entityAimOffset: shared.Vector3 | null;

    /**
     * Is the flashlight of the player activated.
     */
    public readonly flashlightActive: boolean;

    /**
     * Current health of the player.
     */
    public readonly health: number;

    /**
     * Current max health of the player.
     */
    public readonly maxHealth: number;

    /**
     * Retrieves the player from the pool.
     *
     * @param id The id of the player.
     * @returns Entity if it was found, otherwise null.
     */
    public static getByID(id: number): Player | null;

    /**
     * Retrieves the player from the pool.
     *
     * @param scriptID The script id of the player.
     * @returns Entity if it was found, otherwise null.
     */
    public static getByScriptID(scriptID: number): Player | null;

    /**
     * Set & get the volume for 3D Voice.
     *
     * @remarks Value needs to be between 0-1.
     */
    public spatialVolume: number;

    /**
     * Set & get the volume for 2D Voice.
     *
     * @remarks Value needs to be between 0-1.
     */
    public nonSpatialVolume: number;

    /**
     * Has the player superjump enabled.
     *
     * @alpha
     */
    //public readonly isSuperJumpEnabled: boolean;

    /**
     * Is the player currently crouching.
     *
     * @alpha
     */
    //public readonly isCrouching: boolean;

    /**
     * Is the player currently stealthy.
     *
     * @alpha
     */
    //public readonly isStealthy: boolean;
  }

  export class LocalPlayer extends Player {
    /**
     * Ammo of the currently held weapon.
     *
     * @returns Total ammo of the currently held weapon. 0 if no weapon is equipped.
     */
    public readonly currentAmmo: number;
  }

  export class Vehicle extends Entity {
    /**
     * Array with all vehicles.
     *
     * @remarks This creates a clone of the array everytime it is called.
     * It is advised to call this once and store the result in a variable, before iterating over it.
     * @example
     * ```js
     * const vehicles = alt.Vehicle.all; // Store it in a variable, so it doesn't create a copy of the array on each iteration
     * for(let i = 0; i < vehicles.length; i++)
     * {
     *   alt.log(`${vehicles[i].model}`); // Logs the model of every vehicle
     * }
     * ```
     */
    public static readonly all: Array<Vehicle>;

    /**
     * Array with all streamed in vehicles.
     */
    public static readonly streamedIn: Array<Vehicle>;

    /**
     * Vehicle gear.
     *
     * @returns A number indicating actual gear.
     */
    public gear: number;

    /**
     * Vehicle max gear.
     */
    public maxGear: number;

    /**
     * Vehicle handling, which affects how vehicle responds and reacts to the inputs of a driver.
     */
    public handling: IVehicleHandling;

    /**
     * Vehicle indicator lights.
     */
    public indicatorLights: VehicleIndicatorLights;

    /**
     * Vehicle RPM.
     *
     * @returns Normalised value on a scale of [0, 1].
     */
    public readonly rpm: number;

    /**
     * Vehicle wheels speed.
     */
    public readonly speed: number;

    /**
     * Vehicle speed vector.
     */
    public readonly speedVector: shared.Vector3;

    /**
     * Vehicle velocity vector.
     *
     * @alpha
     */
    //public readonly velocity: shared.Vector3;

    /**
     * Vehicle wheels count.
     */
    public readonly wheelsCount: number;

    /**
     * Is the vehicle destroyed.
     *
     * @alpha
     */
    //public readonly isDestroyed: boolean;

    /**
     * Available modkits for the vehicle.
     *
     * @alpha
     */
    //public readonly modKitsCount: number;

    /**
     * Current vehicle modkit.
     *
     * @alpha
     */
    //public readonly modKit: number;

    /**
     * Vehicle primary color.
     *
     * @alpha
     */
    //public readonly primaryColor: number;

    /**
     * Custom (RGB) vehicle primary color.
     *
     * @alpha
     */
    //public readonly customPrimaryColor: shared.RGBA;

    /**
     * Vehicle secondary color.
     *
     * @alpha
     */
    //public readonly secondaryColor: number;

    /**
     * Custom (RGB) vehicle secondary color.
     *
     * @alpha
     */
    //public readonly customSecondaryColor: shared.RGBA;

    /**
     * Vehicle pearl color.
     *
     * @alpha
     */
    //public readonly pearlColor: number;

    /**
     * Vehicle wheel color.
     *
     * @alpha
     */
    //public readonly wheelColor: number;

    /**
     * Vehicle interior color.
     *
     * @alpha
     */
    //public readonly interiorColor: number;

    /**
     * Vehicle dashboard color.
     *
     * @alpha
     */
    //public readonly dashboardColor: number;

    /**
     * Vehicle tire smoke color.
     *
     * @alpha
     */
    //public readonly tireSmokeColor: number;

    /**
     * Vehicle wheel type.
     *
     * @alpha
     */
    //public readonly wheelType: number;

    /**
     * Vehicle front wheels variation.
     *
     * @alpha
     */
    //public readonly frontWheels: number;

    /**
     * Vehicle rear wheels variation.
     *
     * @alpha
     */
    //public readonly rearWheels: number;

    /**
     * Are custom tires active.
     *
     * @alpha
     */
    //public readonly customTires: boolean;

    /**
     * Vehicle darkness.
     *
     * @alpha
     */
    //public readonly darkness: number;

    /**
     * Vehicle number plate type index.
     *
     * @alpha
     */
    //public readonly numberPlateIndex: number;

    /**
     * Vehicle number plate text.
     *
     * @alpha
     */
    //public readonly numberPlateText: string;

    /**
     * Vehicle window tint.
     *
     * @alpha
     */
    //public readonly windowTint: number;

    /**
     * Vehicle dirt level.
     *
     * @alpha
     */
    //public readonly dirtLevel: number;

    /**
     * Vehicle neon.
     *
     * @alpha
     */
    //public readonly neon: IVehicleNeon;

    /**
     * Vehicle neon color.
     *
     * @alpha
     */
    //public readonly neonColor: shared.RGBA;

    /**
     * Vehicle livery.
     *
     * @alpha
     */
    //public readonly livery: number;

    /**
     * Vehicle roof livery.
     *
     * @alpha
     */
    //public readonly roofLivery: number;

    /**
     * Vehicle engine state.
     *
     * @alpha
     */
    //public readonly engineOn: boolean;

    /**
     * Vehicle handbrake state.
     *
     * @alpha
     */
    //public readonly handbrakeActive: boolean;

    /**
     * Vehicle headlight color.
     *
     * @alpha
     */
    //public readonly headlightColor: number;

    /**
     * Vehicle active radio station.
     *
     * @alpha
     */
    //public readonly activeRadioStation: number;

    /**
     * Vehicle siren state.
     *
     * @alpha
     */
    //public readonly sirenActive: boolean;

    /**
     * Vehicle lock state.
     *
     * @alpha
     */
    //public readonly lockState: number;

    /**
     * Vehicle daylight state.
     *
     * @alpha
     */
    //public readonly daylightOn: boolean;

    /**
     * Vehicle nightlight state.
     *
     * @alpha
     */
    //public readonly nightlightOn: boolean;

    /**
     * Vehicle roof state.
     *
     * @alpha
     */
    //public readonly roofState: number;

    /**
     * Vehicle flamethrower state.
     *
     * @alpha
     */
    //public readonly flamethrowerActive: boolean;

    /**
     * Vehicle lights multiplier.
     *
     * @alpha
     */
    //public readonly lightsMultiplier: number;

    /**
     * The vehicle's engine health.
     *
     * @alpha
     */
    //public readonly engineHealth: number;

    /**
     * The vehicle's petrol tank health.
     *
     * @alpha
     */
    //public readonly petrolTankHealth: number;

    /**
     * Vehicle repairs count.
     *
     * @alpha
     */
    //public readonly repairsCount: number;

    /**
     * The vehicle's body health.
     *
     * @alpha
     */
    //public readonly bodyHealth: number;

    /**
     * The vehicle's additional body health.
     *
     * @alpha
     */
    //public readonly bodyAdditionalHealth: number;

    /**
     * Does the vehicle currently have the bulletproof windows?
     *
     * @alpha
     */
    //public readonly hasArmoredWindows: boolean;

    /**
     * Determines whether the vehicle's engine should be turned on/off automatically.
     *
     * @alpha
     */
    //public readonly manualEngineControl: boolean;

    /**
     * Retrieves the vehicle from the pool.
     *
     * @param id The id of the vehicle.
     * @returns Entity if it was found, otherwise null.
     */
    public static getByID(id: number): Vehicle | null;

    /**
     * Retrieves the vehicle from the pool.
     *
     * @param scriptID The script id of the vehicle.
     * @returns Entity if it was found, otherwise null.
     */
    public static getByScriptID(scriptID: number): Vehicle | null;
  }

  export class WebView extends shared.BaseObject {
    /** View visibility state */
    public isVisible: boolean;
    /** View URL */
    public url: string;

    /**
     * Is the webview a overlay.
     */
    public readonly isOverlay: boolean;

    /**
     * Is the webview ready.
     */
    public readonly isReady: boolean;

    /**
     * Is the webview focused.
     */
    public focused: boolean;

    /**
     * Creates a fullscreen WebView.
     *
     * @param url URL of the html file.
     * @param isOverlay true to render as overlay, false to render on game's GUI stage.
     */
    constructor(url: string, isOverlay?: boolean);

    /**
     * Creates a WebView.
     *
     * @param url URL of the html file.
     * @param pos x, y coordinates of the position.
     *
     * @hidden
     */
    constructor(url: string, pos: shared.IVector2);

    /**
     * Creates a custom size WebView and specific pos.
     *
     * @param url URL of the html file.
     * @param pos x, y coordinates of the position.
     * @param size x, y to define the size.
     *
     * @hidden
     */
    constructor(url: string, pos: shared.IVector2, size: shared.IVector2);

    /**
     * Creates a custom size WebView and specific pos.
     *
     * @param url URL of the html file.
     * @param isOverlay true to render as overlay, false to render on game's GUI stage.
     * @param pos x, y coordinates of the position.
     * @param size x, y to define the size.
     *
     * @hidden
     */
    constructor(url: string, isOverlay: boolean, pos: shared.IVector2, size: shared.IVector2);

    /**
     * Creates a WebView rendered on game object.
     *
     * @param url URL of the html file.
     * @param propHash Hash of object to render on.
     * @param targetTexture Name of object's texture to replace.
     */
    constructor(url: string, propHash: number, targetTexture: string);

    /**
     * Emits specified event across particular WebView.
     *
     * @param eventName Name of the event.
     * @param args Rest parameters for emit to send.
     */
    public emit(eventName: string, ...args: any[]): void;

    /**
     * Unsubscribes from WebView event handler with specified listener.
     *
     * @remarks Listener should be of the same reference as when event was subscribed.
     *
     * @param eventName Name of the event.
     * @param listener Listener that should be removed.
     */
    public off(eventName: string, listener: (...args: any[]) => void): void;

    /**
     * Subscribes to WebView event handler with specified listener.
     *
     * @param eventName Name of the event.
     * @param listener Listener that should be added.
     */
    public on(eventName: string, listener: (...args: any[]) => void): void;

    /**
     * Subscribes to WebView event handler with specified listener.
     *
     * @param eventName Name of the event.
     * @param listener Listener that should be added.
     */
    public on(eventName: "load", listener: () => void): void;

    /**
     * Subscribes to WebView event with specified listener, which only triggers once.
     *
     * @param eventName Name of the event.
     * @param listener Listener that should be added.
     */
    public once(eventName: string, listener: (...args: any[]) => void): void;

    /**
     * Focuses the webview so it can be interacted with.
     */
    public focus(): void;

    /**
     * Unfocuses the webview so it ignores user input.
     */
    public unfocus(): void;

    /**
     * Gets all the listeners for the specified webview event.
     *
     * @param eventName Name of the event.
     * @returns Array of listener functions for that event.
     */
    public getEventListeners(eventName: string | null): Function[];

    /**
     * Sets the specified header to the specified value.
     *
     * @param header Header name.
     * @param value Header value.
     */
    public setExtraHeader(header: string, value: string): void;

    /**
     * Sets the zoom level for webview.
     *
     * @param value Zoom level value.
     */
    public setZoomLevel(value: number): void;
  }

  export class Worker {
    /**
     * Maximum available workers per resource.
     */
    public static readonly maxWorkers: number;

    /**
     * Adds a shared array buffer to the workers array buffer pool.
     *
     * @remarks Make sure to remove the array buffer once you are done with it by calling {@link removeSharedArrayBuffer},
     * otherwise you are creating a memory leak.
     *
     * @param buffer The shared array buffer to make available in workers.
     * @returns The id of the shared array buffer that can be used in workers to retrieve it.
     */
    public static addSharedArrayBuffer(buffer: SharedArrayBuffer): number;

    /**
     * Removes the shared array buffer from the workers array buffer pool.
     *
     * @param id The id of the shared array buffer to remove.
     */
    public static removeSharedArrayBuffer(id: number): void;

    /**
     * Creates a new worker.
     *
     * @remarks This will throw an error if the resource has reached its maximum amount of workers. See {@link maxWorkers}.
     *
     * @param filePath The path to the worker script file, can be relative or absolute path.
     */
    constructor(filePath: string);

    /**
     * Whether this worker is still valid. See {@link destroy}.
     */
    public readonly valid: boolean;

    /**
     * The file path that was used to create this worker.
     */
    public readonly filePath: string;

    /**
     * Whether the worker is currently paused. See {@link pause} and {@link resume}.
     */
    public readonly isPaused: boolean;

    /**
     * Starts the worker script.
     */
    public start(): void;

    /**
     * Destroys the worker and stops it.
     *
     * @remarks This permanently sets {@link valid} to false.
     */
    public destroy(): void;

    /**
     * Emits the specified event to the worker.
     *
     * @remarks This can be called before the worker is started.
     */
    public emit(eventName: string, ...args: any[]): void;

    /**
     * Listens to an event emitted by the worker.
     *
     * @remarks The event handlers should be registered before starting the worker.
     *
     * @param eventName The event to listen for.
     * @param callback The callback to call when the event is received.
     */
    public on(eventName: string, callback: (...args: any[]) => void): void;

    /**
     * Listens to an event emitted by the worker once.
     *
     * @remarks See {@link on}.
     *
     * @param eventName The event to listen for.
     * @param callback The callback to call when the event is received.
     */
    public once(eventName: string, callback: (...args: any[]) => void): void;

    /**
     * Pauses execution of the worker.
     *
     * @remarks This completely stops the JavaScript event loop of the worker
     * but events can still be received (and will be handled once the worker is resumed).
     */
    public pause(): void;

    /**
     * Resumes execution of the worker.
     *
     * @remarks See {@link pause}.
     */
    public resume(): void;
  }

  export class Blip extends WorldObject {
    /**
     * Array with all blips.
     *
     * @remarks This creates a clone of the array everytime it is called.
     * It is advised to call this once and store the result in a variable, before iterating over it.
     * @example
     * ```js
     * const blips = alt.Blip.all; // Store it in a variable, so it doesn't create a copy of the array on each iteration
     * for(let i = 0; i < blips.length; i++)
     * {
     *   alt.log(`${blips[i].scriptID}`); // Logs the scriptID of every blip
     * }
     * ```
     */
    public static readonly all: Array<Blip>;

    public readonly scriptID: number;

    public static routeColor: shared.RGBA;

    public alpha: number;

    public asMissionCreator: boolean;

    public bright: boolean;

    public category: number;

    public color: shared.BlipColor;

    public crewIndicatorVisible: boolean;

    public display: number;

    public flashes: boolean;

    public flashesAlternate: boolean;

    public flashInterval: number;

    public flashTimer: number;

    public friendIndicatorVisible: boolean;

    public gxtName: string;

    public heading: number;

    public headingIndicatorVisible: boolean;

    public highDetail: boolean;

    public name: string;

    public number: number;

    public outlineIndicatorVisible: boolean;

    public priority: number;

    public pulse: boolean;

    public route: boolean;

    public scale: number;

    public secondaryColor: number | shared.RGBA;

    public shortRange: boolean;

    public showCone: boolean;

    public shrinked: boolean;

    public size: shared.Vector2;

    public sprite: shared.BlipSprite;

    public tickVisible: boolean;

    public fade(opacity: number, duration: number): void;
  }

  export class AreaBlip extends Blip {
    constructor(x: number, y: number, z: number, width: number, height: number);
  }

  export class RadiusBlip extends Blip {
    constructor(x: number, y: number, z: number, radius: number);
  }

  export class PointBlip extends Blip {
    constructor(x: number, y: number, z: number);
  }

  /**
   * Create a attached blip to a ped.
   *
   * @param ped Index of the player in alt.Player.all.
   */
  export class PedBlip extends Blip {
    constructor(ped: number);
  }

  /**
   * Create a attached blip to a vehicle.
   *
   * @param vehicle Index of the vehicle in alt.Vehicle.all.
   */
  export class VehicleBlip extends Blip {
    constructor(vehicle: number);
  }

  /**
   * Vehicle handling, which affects how vehicle responds and reacts to the inputs of a driver.
   * This handling applies to all vehicle instances, as opposed to the {@link Vehicle.handling}.
   *
   * @remarks Changes will be reflected on every vehicle using this particular handling, but might require vehicle recreating for changes to apply properly.
   */
  export class HandlingData {
    public readonly handlingNameHash: number;
    public acceleration: number;
    public antiRollBarBiasFront: number;
    public antiRollBarBiasRear: number;
    public antiRollBarForce: number;
    public brakeBiasFront: number;
    public brakeBiasRear: number;
    public brakeForce: number;
    public camberStiffnesss: number;
    public centreOfMassOffset: shared.Vector3;
    public clutchChangeRateScaleDownShift: number;
    public clutchChangeRateScaleUpShift: number;
    public collisionDamageMult: number;
    public damageFlags: number;
    public deformationDamageMult: number;
    public downforceModifier: number;
    public driveBiasFront: number;
    public driveInertia: number;
    public driveMaxFlatVel: number;
    public engineDamageMult: number;
    public handBrakeForce: number;
    public handlingFlags: number;
    public inertiaMultiplier: shared.Vector3;
    public initialDragCoeff: number;
    public initialDriveForce: number;
    public initialDriveGears: number;
    public initialDriveMaxFlatVel: number;
    public lowSpeedTractionLossMult: number;
    public mass: number;
    public modelFlags: number;
    public monetaryValue: number;
    public oilVolume: number;
    public percentSubmerged: number;
    public percentSubmergedRatio: number;
    public petrolTankVolume: number;
    public rollCentreHeightFront: number;
    public rollCentreHeightRear: number;
    public seatOffsetDistX: number;
    public seatOffsetDistY: number;
    public seatOffsetDistZ: number;
    public steeringLock: number;
    public steeringLockRatio: number;
    public suspensionBiasFront: number;
    public suspensionBiasRear: number;
    public suspensionCompDamp: number;
    public suspensionForce: number;
    public suspensionLowerLimit: number;
    public suspensionRaise: number;
    public suspensionReboundDamp: number;
    public suspensionUpperLimit: number;
    public tractionBiasFront: number;
    public tractionBiasRear: number;
    public tractionCurveLateral: number;
    public tractionCurveLateralRatio: number;
    public tractionCurveMax: number;
    public tractionCurveMaxRatio: number;
    public tractionCurveMin: number;
    public tractionCurveMinRatio: number;
    public tractionLossMult: number;
    public tractionSpringDeltaMax: number;
    public tractionSpringDeltaMaxRatio: number;
    public unkFloat1: number;
    public unkFloat2: number;
    public unkFloat4: number;
    public unkFloat5: number;
    public weaponDamageMult: number;

    /**
     * Initializes a new instance of the {@link HandlingData} class that can modify handling properties for the specified handling name.
     *
     */
    public static getForHandlingName(handlingHash: number): HandlingData;
  }

  export class MapZoomData {
    public fZoomScale: number;
    public fZoomSpeed: number;
    public fScrollSpeed: number;
    public vTilesX: number;
    public vTilesY: number;

    constructor(zoomDataId: number);

    public static get(zoomData: string): MapZoomData;

    public static resetAll(): void;

    public reset(): void;
  }

  export class LocalStorage {
    /**
     * Gets the value from the specified key in the local storage.
     */
    public static get(key: string): any;

    /**
     * Deletes the specified key from the local storage.
     */
    public static delete(key: string): void;

    /**
     * Deletes all keys from the local storage.
     */
    public static deleteAll(): void;

    /**
     * Alias for {@link deleteAll}.
     */
    public static clear(): void;

    /**
     * Saves the changes to the disk.
     */
    public static save(): void;

    /**
     * Sets the specified key to the specified value in the local storage.
     */
    public static set(key: string, value: any): void;
  }

  export class MemoryBuffer {
    constructor(size: number);

    public readonly size: number;

    public readonly address: bigint;

    public byte(offset: number): number;

    public double(offset: number): number;

    public float(offset: number): number;

    public int(offset: number): number;

    public long(offset: number): bigint;

    public short(offset: number): number;

    public string(offset: number, length: number): string;

    public ubyte(offset: number): number;

    public uint(offset: number): number;

    public ulong(offset: number): bigint;

    public ushort(offset: number): number;

    public free(): boolean;
  }

  export class Discord {
    public static readonly currentUser: IDiscordUser | null;
  }

  export class Voice {
    /**
     * Determines whether the microphone input is currently disabled.
     */
    static muteInput: boolean;

    /**
     * Determines if the voice activation is enabled.
     */
    static activityInputEnabled: boolean;

    /**
     * Returns the keycode of the voice activation key.
     */
    static activationKey: number;
  }

  /**
   * Adds a new GXT entry with the specified value.
   *
   * @remarks The GXT entry FE_THDR_GTAO is locked and cannot be changed.
   *
   * @param key GXT entry name.
   * @param value GXT entry value.
   */
  export function addGxtText(key: string, value: string): void;

  /**
   * Executes the specified scaleform method on the minimap.
   */
  export function beginScaleformMovieMethodMinimap(methodName: string): boolean;

  /**
   * Emits specified event to server.
   *
   * @param player Event is sent to specific player.
   * @param eventName Name of the event.
   * @param args Rest parameters for emit to send.
   */
  export function emitServer(name: string, ...args: any[]): void;

  /**
   * Emits specified event to server.
   *
   * @param eventName Name of the event.
   * @param args Rest parameters for emit to send.
   *
   * @remarks Works only from JS (Client) to JS (Server)
   */
  export function emitServerRaw(name: string, ...args: any[]): void;

  /**
   * Returns whether the game controls are currently enabled.
   */
  export function gameControlsEnabled(): boolean;

  /**
   * Gets the current position of the cursor.
   */
  export function getCursorPos(): shared.Vector2;

  /**
   * Gets the value of the specified GXT entry.
   *
   * @param key GXT entry name.
   */
  export function getGxtText(key: string): string;

  export function getLicenseHash(): string;

  /**
   * Gets the current alt:V locale.
   */
  export function getLocale(): string;

  /**
   * Gets the current milliseconds per game minute.
   *
   * @remarks This is set with the {@link setMsPerGameMinute} function.
   */
  export function getMsPerGameMinute(): number;

  /**
   * Gets the state of the specified permission.
   *
   * @param permId Permission id.
   * @returns Permission state.
   */
  export function getPermissionState(permId: Permission): PermissionState;

  /**
   * Gets a value of the specified statistic.
   *
   * @param statName Name of the statistic.
   */
  export function getStat(statName: StatName): number;

  /**
   * Returns state of console window.
   *
   * @returns True when console window is opened.
   */
  export function isConsoleOpen(): boolean;

  /**
   * Returns state of game window.
   *
   * @returns True when game window is focused.
   */
  export function isGameFocused(): boolean;

  /**
   * Returns if alt:V is in streamer mode.
   *
   * @returns True when alt:V client is launched in streamer mode.
   */
  export function isInStreamerMode(): boolean;

  /**
   * Returns whether the specified key is toggled.
   *
   * @param key Keycode.
   */
  export function isKeyToggled(key: number): boolean;

  /**
   * Determines whether the specified key is pressed.
   *
   * @param Keycode of the key.
   */
  export function isKeyDown(key: number): boolean;

  /**
   * Returns state of user interface and console window.
   *
   * @returns True when user interface or console window is opened.
   */
  export function isMenuOpen(): boolean;

  export function isTextureExistInArchetype(modelHash: number, targetTextureName: string): boolean;

  /**
   * Loads a model into memory synchronously.
   *
   * @param modelHash Hash of the model.
   */
  export function loadModel(modelHash: number): void;

  /**
   * Loads a model into memory asynchronously.
   *
   * @param modelHash Hash of the model.
   */
  export function loadModelAsync(modelHash: number): void;

  /**
   * Unsubscribes from a server event with the specified listener.
   *
   * @remarks Listener should be of the same reference as when event was subscribed to.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be removed.
   */
  export function offServer(eventName: string, listener: (...args: any[]) => void): void;

  /**
   * Subscribes to a client event with the specified listener.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function on<K extends keyof IClientEvent>(eventName: K, listener: IClientEvent[K]): void;

  /**
   * Subscribes to a custom client event with the specified listener.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function on(eventName: string, listener: (...args: any[]) => void): void;

  /**
   * Subscribes to a client event with the specified listener, which only triggers once.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function once<K extends keyof IClientEvent>(eventName: K, listener: IClientEvent[K]): void;

  /**
   * Subscribes to a custom client event with the specified listener, which only triggers once.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function once(eventName: string, listener: (...args: any[]) => void): void;

  /**
   * Subscribes to a server event with the specified listener.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function onServer(eventName: string, listener: (...args: any[]) => void): void;

  /**
   * Subscribes to all server events with the specified listener.
   *
   * @remarks Listener will be only called for user-created events.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function onServer(listener: (eventName: string, ...args: any[]) => void): void;

  /**
   * Subscribes to a server event with the specified listener, which only triggers once.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function onceServer(eventName: string, listener: (...args: any[]) => void): void;

  /**
   * Subscribes to all server events with the specified listener, which only triggers once.
   *
   * @remarks Listener will be only called for user-created events.
   *
   * @param eventName Name of the event.
   * @param listener Listener that should be added.
   */
  export function onceServer(listener: (eventName: string, ...args: any[]) => void): void;

  /**
   * Removes the specified GXT entry.
   *
   * @param key GXT entry name.
   */
  export function removeGxtText(key: string): void;

  /**
   * Unloads the specified ipl.
   *
   * @param iplName Name of the ipl.
   */
  export function removeIpl(iplName: string): void;

  /**
   * Loads the specified ipl.
   *
   * @param iplName Name of the ipl.
   */
  export function requestIpl(iplName: string): void;

  /**
   * The output is returned as a base64 string.
   *
   * @returns Return is dependent on the success of the operation.
   */
  export function takeScreenshot(): Promise<string>;

  /**
   * The output is returned as a base64 string.
   *
   * @remarks This only takes a screenshot of the raw GTA:V window. WebViews, game overlays etc. won't be captured.
   *
   * @returns Return is dependent on the success of the operation.
   */
  export function takeScreenshotGameOnly(): Promise<string>;

  /**
   * Resets a statistic to its default value.
   *
   * @param statName Name of the statistic.
   */
  export function resetStat(statName: StatName): void;

  /**
   * Freezes the camera in place so it doesn't change position or rotation.
   *
   * @remarks You can still move your character even if your camera is frozen.
   *
   * @param state True to freeze the camera, false to unfreeze the camera.
   */
  export function setCamFrozen(state: boolean): void;

  /**
   * Sets the specified ped config flag of the local player to the specified state.
   *
   * @param flag Config flag name.
   * @param state Config flag state.
   */
  export function setConfigFlag(flag: ConfigFlag, state: boolean): void;

  /**
   * Returns the state of the specified ped config flag of the local player.
   *
   * @param flag Config flag name.
   * @returns State of the specified config flag.
   */
  export function getConfigFlag(flag: ConfigFlag): boolean;

  /**
   * Returns whether the specified config flag exists.
   *
   * @param flag Config flag name.
   * @returns True when the config flag exists.
   */
  export function doesConfigFlagExist(flag: string): boolean;

  /**
   * Sets the current position of the cursor.
   *
   * @remarks The cursor has to be visible for this to take effect.
   */
  export function setCursorPos(pos: shared.IVector2): void;

  /**
   * Sets the amount of real milliseconds that have to pass every game minute.
   */
  export function setMsPerGameMinute(milliseconds: number): void;

  /**
   * Sets the rotation velocity for the specified entity.
   *
   * @param scriptID The script id of the entity.
   * @param x The rotation velocity on the X axis.
   * @param y The rotation velocity on the Y axis.
   * @param z The rotation velocity on the Z axis.
   */
  export function setRotationVelocity(scriptID: number, x: number, y: number, z: number): void;

  /**
   * Sets a statistic to desired value.
   *
   * @param statName Name of the statistic.
   * @param value Value of the statistic you want to set.
   */
  export function setStat(statName: StatName, value: number): void;

  /**
   * Sets the current weather cycle.
   *
   * @remarks This has to be activated after using it by using the {@link setWeatherSyncActive} function.
   * The weathers and multipliers array has to be of the same length.
   *
   * @param weathers An array containing the weather ids for the weather cycle.
   * @param multipliers An array containing the multipliers for the weather cycle.
   */
  export function setWeatherCycle(weathers: Array<number>, multipliers: Array<number>): void;

  /**
   * Sets whether the weather sync is active.
   *
   * @remarks The weather sync has to be set by using the {@link setWeatherCycle} function.
   *
   * @param isActive Whether the weather sync should be active.
   */
  export function setWeatherSyncActive(isActive: boolean): void;

  /**
   * Changes the visibility of cursor.
   *
   * @remarks This is handled by resource scoped internal integer, which gets increased/decreased by every function call. When you show your cursor 5 times, to hide it you have to do that 5 times accordingly.
   *
   * @param state A boolean indicating whenever cursor should be visible or not.
   */
  export function showCursor(state: boolean): void;

  /**
   * Toggles the game controls.
   *
   * @remarks When this is set to false, all controls are disabled, so you can't move your character or the camera.
   *
   * @param state True to enable controls, false to disable controls.
   */
  export function toggleGameControls(state: boolean): void;

  export function toggleVoiceControls(state: boolean): void;

  export class WebSocketClient extends shared.BaseObject {
    public autoReconnect: boolean;

    public perMessageDeflate: boolean;

    /**
     * Optional heartbeat, sent every x seconds when there isn't any traffic.
     *
     * @Remarks This makes sure, that load balancers do not kill an idle connection.
     */
    public pingInterval: number;

    public url: string;

    public readonly readyState: WebSocketReadyState;

    constructor(url: string);

    public on(eventName: "open", listener: () => void): void;

    public on(eventName: "close", listener: (code: number, reason: string) => void): void;

    public on(eventName: "message", listener: (message: string) => void): void;

    public on(eventName: "error", listener: (error: string) => void): void;

    public off(eventName: string, listener: (...args: any[]) => void): void;

    /**
     * Starts the websocket connection.
     */
    public start(): void;

    /**
     * Stops the websocket connection.
     */
    public stop(): void;

    /**
     * Sends the specified message to the websocket server.
     *
     * @param message The message to send.
     * @returns Whether sending the message was successful.
     */
    public send(message: string | ArrayBuffer | ArrayBufferView): boolean;

    /**
     * Adds a sub protocol to the websocket.
     *
     * @param protocol Name of the protocol.
     */
    public addSubProtocol(protocol: string): void;

    /**
     * Gets all added sub protocols.
     */
    public getSubProtocols(): string[];

    /**
     * Sets the specified header to the specified value.
     *
     * @param header Header name.
     * @param value Header value.
     */
    public setExtraHeader(header: string, value: string): void;

    /**
     * Gets all the listeners for the specified websocket event.
     *
     * @param eventName Name of the event.
     * @returns Array of listener functions for that event.
     */
    public getEventListeners(eventName: string | null): Function[];
  }

  /**
   * Load a specific ytyp file.
   *
   * @example
   * ```js
   * alt.loadYtyp("x64u.rpf/levels/gta5/_hills/country_06/country_06_metadata.rpf/cs6_08_interior_cs6_08_mine_int.ytyp")
   * ```
   *
   * @param path Relative path to the game folder.
   */
  export function loadYtyp(path: string): boolean;

  /**
   * Unload a specific ytyp file.
   *
   * @example
   * ```js
   * alt.unloadYtyp("x64u.rpf/levels/gta5/_hills/country_06/country_06_metadata.rpf/cs6_08_interior_cs6_08_mine_int.ytyp")
   * ```
   *
   * @param path Relative path to the game folder.
   */
  export function unloadYtyp(path: string): boolean;

  /**
   * Evaluates and executes the given JavaScript code.
   *
   * @remarks The code is evaluated in its own context, so it cannot access variables, functions etc. from the calling file.
   *
   * @param code The JavaScript code.
   * @returns The exports of the evaluated module.
   */
  export function evalModule(code: string): Record<string, any>;

  /**
   * Gets all the listeners for the specified local event.
   *
   * @param eventName Name of the event or null for generic event.
   * @returns Array of listener functions for that event.
   */
  export function getEventListeners(eventName: string | null): Function[];

  /**
   * Gets all the listeners for the specified remote event.
   *
   * @param eventName Name of the event or null for generic event.
   * @returns Array of listener functions for that event.
   */
  export function getRemoteEventListeners(eventName: string | null): Function[];

  export class HttpClient extends shared.BaseObject {
    public constructor();

    public setExtraHeader(header: string, value: string): void;

    public getExtraHeaders(): Record<string, string>;

    public get(url: string): Promise<IHttpResponse>;

    public head(url: string): Promise<IHttpResponse>;

    public post(url: string, body: string): Promise<IHttpResponse>;

    public put(url: string, body: string): Promise<IHttpResponse>;

    public delete(url: string, body: string): Promise<IHttpResponse>;

    public connect(url: string, body: string): Promise<IHttpResponse>;

    public options(url: string, body: string): Promise<IHttpResponse>;

    public trace(url: string, body: string): Promise<IHttpResponse>;

    public patch(url: string, body: string): Promise<IHttpResponse>;
  }

  /**
   * Gets the Base64 encoded string of the headshot with the specified ID.
   *
   * @remarks The headshot ID is returned by the `registerPedheadshot3`, `registerPedheadshotTransparent` or `registerPedheadshot` native.
   *
   * @param id ID of the headshot.
   * @returns The Base64 string of the headshot image.
   */
  export function getHeadshotBase64(id: number): string;

  /**
   * Sets the specified dlc clothing component to a ped.
   *
   * @param scriptID ScriptID of the Ped.
   * @param dlc Dlc hash of the clothing.
   * @param component Component id of the clothing.
   * @param drawable Drawable id of the clothing.
   * @param texture Texture id of the clothing.
   * @param palette Palette of the clothing.
   */
  export function setPedDlcClothes(scriptID: number, dlc: number, component: number, drawable: number, texture: number, palette?: number): void;

  /**
   * Sets the specified dlc prop component to a ped.
   *
   * @param scriptID ScriptID of the Ped.
   * @param dlc Dlc hash of the prop.
   * @param component Component id of the prop.
   * @param drawable Drawable id of the prop.
   * @param texture Texture id of the prop.
   */
  export function setPedDlcProp(scriptID: number, dlc: number, component: number, drawable: number, texture: number): void;

  /**
   * Removes a specified prop component from a ped.
   *
   * @param scriptID ScriptID of the Ped.
   * @param component Component id of the prop.
   */
  export function clearPedProp(scriptID: number, component: number): void;

  export class Profiler {
    public static readonly heapStats: IHeapStats;
    /** Sampling interval in microseconds. Defaults to 100. */
    public static samplingInterval: number;
    public static readonly profilesRunning: number;

    /**
     * Starts a new profile with the specified name.
     *
     * @remarks This can throw an error if starting the profile fails.
     *
     * @param profileName Name to be used in {@link stopProfiling}. Defaults to empty string.
     */
    public static startProfiling(profileName?: string): void;

    /**
     * Stops the profile with the specified name.
     *
     * @param profileName Name of the profile specified in {@link startProfiling}. Defaults to empty string.
     */
    public static stopProfiling(profileName?: string): IProfile;
  }

  /**
   * Change the position of the alt:V watermark.
   *
   * @param position Watermarkposition.
   */
  export function setWatermarkPosition(position: WatermarkPosition): void;

  /**
   * Represents the current client ping.
   */
  export function getPing(): number;

  /**
   * Represents the current client fps.
   */
  export function getFps(): number;

  export function getTotalPacketsSent(): bigint;

  export function getTotalPacketsLost(): bigint;

  export function getServerIp(): string;

  export function getServerPort(): number;

  export * from "alt-shared";
}
