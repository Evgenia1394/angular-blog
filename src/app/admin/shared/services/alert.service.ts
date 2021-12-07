import {Injectable} from "@angular/core";
import {Subject} from "rxjs";

export type AlertType = 'success' | 'warning' | 'danger'//литералы для типа

export interface Alert {
  type: AlertType//литеральный
  text: string
}

@Injectable()
export class AlertService {
  public alert$ = new Subject<Alert>()

  success(text: string): void {
    this.alert$.next({type: 'success', text})//вызывая метод диспатчим для алерта новый объект
  }

  warning(text: string): void {
    this.alert$.next({type: 'warning', text})
  }
  danger(text: string): void {
    this.alert$.next({type: 'danger', text})
  }

}
