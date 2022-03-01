import Color from "./Color.js";

export default class Embed {
    constructor(data={}) {
        this.title = data.title || null;
        this.url = data.url || null;
        this.description = data.description || null;
        this.author = data.author || {name: null, icon_url: null};
        this.image = data.image || { url: null}
        this.fields = data.fields || []
        this.timestamp = data.timestamp || null;
        this.thumbnail = data.thumbnail || {url: null};
        this.footer = data.footer || {text: null, icon_url: null}
    }
    setTitle(text) {
        this.title = text;
        return this;
    }
    setDescription(text) {
        this.description = text;
        return this;
    }
    setImage(text) {
        this.image.url = text;
        return this;
    }
    setThumbnail(text) {
        this.thumbnail.url = text;
        return this;
    }
    setURL(text) {
        this.url = text;
        return this;
    }
    setTimestamp(text=Date.now()) {
        this.timestamp = text;
        return this;
    }    
    setAuthor(text, icon) {
        this.author.name = text;
        this.author.icon_url = icon;
        return this;
    }
    setFooter(text, icon) {
        this.footer.text = text;
        this.footer.icon_url = icon;
        return this;
    }
    setColor(text) {
        this.color = Color(text);
        return this;
    }
    addField(name, value, inline=false) {
        this.fields.push({name, value, inline})
        return this;
    }
    json() {
        const res = {}
        Object.keys(this).forEach(x => {
            if(this[x]) res[x] = this[x];
        })
        return res;
    }
}