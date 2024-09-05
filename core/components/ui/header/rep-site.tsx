"use client"

type Reps = {
    [alias: string] : Rep
}

export type Rep = {
    "name" : string
}

class RepSite {
    private repParamName = "rep";
    public get reps():Reps {
        return {
            corp : {
                "name" : "Amare"
            },
            connor : {
                "name" : "Connor Hester"
            },
            george: {
                "name" : "George FitzGibbons"
            },
            gregg: {
                "name" : "Gregg Belbeck"
            }
        }
    };
    private document:Document;

    constructor(document:Document) {
        this.document = document;
    }

    getRep(searchParams:any):Rep {
        let rep:string | null = searchParams.get('rep');
        let repData;
        if(rep) {
            repData = this.getRepFromDatabase(rep);
            this.saveRep(repData.rep);
        } else {
            rep = this.readRep() || "corp";
            repData = this.getRepFromDatabase(rep);
            this.pushRepToURL(rep);
        }
        return repData.repInfo;
    }
    private getRepFromDatabase(rep:string):{ rep:string, repInfo:Rep } {
        let hasRep = rep && Object.keys(this.reps).indexOf(rep) > -1;
        let repInfo = hasRep ? this.reps[rep] : this.reps["corp"];
        repInfo = repInfo === undefined ? {"name" : ""} : repInfo;

        return {
            "rep": rep,
            "repInfo" : repInfo
        }
    }
    private saveRep(repAlias:string, expiryDays:number = 365):void {
        let _this = this;
        function setCookie(cname:string, cvalue:string, exdays:number) {
            const d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            let expires = "expires="+ d.toUTCString();
            _this.document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        }

        setCookie(this.repParamName, repAlias, expiryDays);
    }
    private readRep():string {
        let _this = this;
        function getCookie(cname:string) {
            let name = cname + "=";
            let decodedCookie = decodeURIComponent(_this.document.cookie);
            let ca = decodedCookie.split(';');
            for(let i = 0; i <ca.length; i++) {
                let c:string = ca[i] || "";
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        return getCookie(this.repParamName);
    }
    private pushRepToURL(rep:string):void {
        function pushState(name:string, value:string):void {
            const url = new URL(location.href);
            url.searchParams.set(name, value);
            history.pushState({}, "", url);
        }
        if(rep) {
            pushState(this.repParamName, rep);
        }
    }
}
export {RepSite}
