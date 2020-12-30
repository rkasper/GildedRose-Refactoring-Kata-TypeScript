export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

const agedBrie: string = 'Aged Brie';
const backstagePasses: string = 'Backstage passes to a TAFKAL80ETC concert';
const sulfuras: string = 'Sulfuras, Hand of Ragnaros';

const maxQuality: number = 50;
const minQuality: number = 0;
const minSellIn: number = 0;

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateInventory(): Array<Item> {
        this.items.forEach(item => {
            GildedRose.handleAgedBrie(item);
            GildedRose.handleBackstagePasses(item);
            GildedRose.handleSulfuras(item);
            GildedRose.handleNormalItem(item);
        });

        return this.items;
    }

    private static handleNormalItem(item: Item) {
        if (GildedRose.isNormalItem(item)) {
            item.sellIn--;

            if (item.sellIn < minSellIn) {
                item.quality -= 2;
            } else {
                item.quality--;
            }
            if (item.quality < minQuality) {
                item.quality = minQuality;
            }
        }
    }

    private static isNormalItem(item: Item) {
        return item.name != agedBrie && item.name != backstagePasses && item.name != sulfuras;
    }

    private static handleSulfuras(item: Item) {
        if (item.name == sulfuras) {
            // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
        }
    }

    private static handleBackstagePasses(item: Item) {
        if (item.name == backstagePasses) {
            item.sellIn--;

            if (GildedRose.concertHappeningEvenSooner(item)) {
                if (item.quality < maxQuality) {
                    item.quality += 3;
                }
            } else if (GildedRose.concertHappeningSoon(item)) {
                if (item.quality < maxQuality) {
                    item.quality += 2;
                }
            } else if (item.sellIn >= minSellIn) {
                item.quality++;
            } else {
                item.quality = minQuality;
            }
        }
    }

    private static handleAgedBrie(item: Item) {
        if (item.name == agedBrie) {
            item.sellIn--;
            if (item.sellIn < minSellIn) {
                item.quality += 2;
            } else {
                item.quality++;
            }
            if (item.quality > maxQuality) {
                item.quality = maxQuality;
            }
        }
    }

    private static concertHappeningEvenSooner(item: Item) {
        return item.sellIn < 6 && item.sellIn >= minSellIn;
    }

    private static concertHappeningSoon(item: Item) {
        return item.sellIn < 11 && item.sellIn >= 6;
    }
}
