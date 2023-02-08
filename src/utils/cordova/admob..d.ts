declare namespace admob {
  namespace banner {
    function config(opts: BannerConfig): BannerConfig;
    function prepare(): Promise<any>;
    function show(): Promise<any>;
    function hide(): Promise<any>;
    function remove(): Promise<any>;
  }
  namespace interstitial {
    function config(opts: InterstitialConfig): InterstitialConfig;
    function isReady(): Promise<any>;
    function prepare(): Promise<any>;
    function show(): Promise<any>;
  }
  namespace rewardvideo {
    function config(opts: RewardVideoConfig): RewardVideoConfig;
    function isReady(): Promise<any>;
    function prepare(): Promise<any>;
    function show(): Promise<any>;
  }
}

interface BaseConfig {
  id?: string;
  isTesting?: boolean;
  autoShow?: boolean;
  forChild?: boolean | null;
  forFamily?: boolean | null;
  location?: number[] | null;
}

interface BannerConfig extends BaseConfig {
  bannerAtTop?: boolean;
  overlap?: boolean;
  offsetTopBar?: boolean;
  size?: BANNER_SIZE;
}

type InterstitialConfig = BaseConfig;

type RewardVideoConfig = BaseConfig;

type BANNER_SIZE = `BANNER` | `IAB_BANNER` |
`IAB_LEADERBOARD` | `IAB_MRECT` | `LARGE_BANNER` | `SMART_BANNER` | `FLUID`;
