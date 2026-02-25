declare global {
  interface Window {
    rc?: {
      conversionHit: (conf: any) => void;
    };
    SKLIK_CONVERSION_ID?: number | string;
  }
}

export class Sklik {
  static trackGameStart() {
    console.log("Sklik: tracking game start");
    this.sendHit();
  }

  static trackPurchase(value?: number) {
    console.log("Sklik: tracking purchase", value);
    this.sendHit(value);
  }

  private static sendHit(value?: number) {
    const id = window.SKLIK_CONVERSION_ID;
    if (!id || id === "undefined" || id === "null") {
      return;
    }

    if (!window.rc || !window.rc.conversionHit) {
      console.warn("Sklik rc.js not loaded, cannot track conversion");
      return;
    }

    const conf: any = {
      id: id,
      consent: 1,
    };

    if (value !== undefined) {
      conf.value = value;
    }

    try {
      window.rc.conversionHit(conf);
    } catch (e) {
      console.error("Sklik: conversionHit failed", e);
    }
  }
}
