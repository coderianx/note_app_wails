export namespace main {
	
	export class Task {
	    title: string;
	    completed: boolean;
	
	    static createFrom(source: any = {}) {
	        return new Task(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.completed = source["completed"];
	    }
	}

}

