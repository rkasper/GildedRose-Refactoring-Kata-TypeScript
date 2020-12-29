import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('Item names don\'t change', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].name).to.equal('foo');
    });

    // - At the end of each day our system lowers both values for every item
    it('At the end of each day our system lowers both values for every item', function() {
        const gildedRose = new GildedRose([ new Item('foo', 42, 31) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(41);
        expect(items[0].quality).to.equal(30);
    });

    // - Once the sell by date has passed, Quality degrades twice as fast
    it('Once the sell by date has passed, Quality degrades twice as fast', function() {
        const gildedRose = new GildedRose([ new Item('foo', 1, 31) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(30);

        gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(28);
    });

    // - The Quality of an item is never negative
    it('The Quality of an item is never negative', function() {
        const gildedRose = new GildedRose([ new Item('foo', 42, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(41);
        expect(items[0].quality).to.equal(0);
    });

    // - "Aged Brie" actually increases in Quality the older it gets
    it('"Aged Brie" actually increases in Quality the older it gets', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 42, 31) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(41);
        expect(items[0].quality).to.equal(32);
    });

    // - The Quality of an item is never more than 50
    it('The Quality of an item is never more than 50', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 42, 49) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(41);
        expect(items[0].quality).to.equal(50);

        gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(40);
        expect(items[0].quality).to.equal(50);
    });

    // - "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
    // Just for clarification, an item can never have its Quality increase above 50, however "Sulfuras" is a
    // legendary item and as such its Quality is 80 and it never alters.
    it('"Sulfuras", being a legendary item, never has to be sold or decreases in Quality', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 42, 80) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(42);
        expect(items[0].quality).to.equal(80);
    });

    // - "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
    it('"Backstage passes", like aged brie, increases in Quality as its SellIn value approaches', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 42, 31) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(41);
        expect(items[0].quality).to.equal(32);
    });

    // Quality [of backstage passes] increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
    it('Quality [of backstage passes] increases by 2 when there are 10 days or less', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 10, 31) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(9);
        expect(items[0].quality).to.equal(33);
    });
    it('Quality [of backstage passes] increases by 3 when there are 5 days or less', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 5, 31) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(4);
        expect(items[0].quality).to.equal(34);
    });

    // Quality [of backstage passes] drops to 0 after the concert
    it('uality [of backstage passes] drops to 0 after the concert', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 31) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(0);
    });
});
