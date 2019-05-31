import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromStore from '../reducers/index';
import { CounterIncrement, CounterDecrement, CounterReset } from "~/actions/counter.actions";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit, OnDestroy {
    total: Observable<number>;
    totalSub: Subscription;
    constructor(private store: Store<fromStore.State>) { }

    ngOnInit() {
        this.total = this.store.select('counter');
        this.totalSub = this.total.subscribe((t) => { console.log("current", t); });
    }
    ngOnDestroy() {
        this.totalSub.unsubscribe();
    }

    increment() {
        this.store.dispatch(new CounterIncrement());
    }

    decrement() {
        this.store.dispatch(new CounterDecrement());
    }

    reset() {
        this.store.dispatch(new CounterReset());
    }
}
