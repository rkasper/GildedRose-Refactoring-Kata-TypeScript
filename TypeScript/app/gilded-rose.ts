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

const minQuality = 0;

const minSellIn = 0;

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            let item: Item = this.items[i];
            if (item.name != agedBrie && item.name != backstagePasses) {
                if (item.quality > minQuality) {
                    if (item.name != sulfuras) {
                        item.quality--
                    }
                }
            } else {
                if (item.quality < maxQuality) {
                    item.quality++
                    if (item.name == backstagePasses) {
                        if (this.concertHappeningSoon(item)) {
                            if (item.quality < maxQuality) {
                                item.quality++
                            }
                        }
                        if (this.concertHappeningEvenSooner(item)) {
                            if (item.quality < maxQuality) {
                                item.quality++
                            }
                        }
                    }
                }
            }
            if (item.name != sulfuras) {
                item.sellIn--;
            }
            if (item.sellIn < minSellIn) {
                if (item.name != agedBrie) {
                    if (item.name != backstagePasses) {
                        if (item.quality > minQuality) {
                            if (item.name != sulfuras) {
                                item.quality--
                            }
                        }
                    } else {
                        item.quality = minQuality
                    }
                } else {
                    if (item.quality < maxQuality) {
                        item.quality++
                    }
                }
            }
        }

        return this.items;
    }

    private concertHappeningEvenSooner(item: Item) {
        return item.sellIn < 6;
    }

    private concertHappeningSoon(item: Item) {
        return item.sellIn < 11;
    }
}
