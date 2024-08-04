import { Injectable } from '@angular/core';
import { BasicRequestQueryItem } from '../model/queryresponses/basicRequestQueryItem';
import { addMinutes, emptydataArray, getMiddleDate, getMinMaxDates, WeekdayLogItem, WeekdaySlot } from '../utils/weekDayUtils';

@Injectable({
  providedIn: 'root'
})
export class WeekdayService {

  dataArray: WeekdayLogItem[][] = emptydataArray
  singleArray: WeekdayLogItem[][] = emptydataArray

  constructor() { }

  insertArray(data: BasicRequestQueryItem[]) {
    this.dataArray = []
    for (let i = 0; i < data.length; i++) {
      let originalDate = new Date(data[i].time)
      let newDate = new Date()
      newDate.setHours(
        originalDate.getHours(),
        originalDate.getMinutes(),
        originalDate.getSeconds()
      )
      let obj = new WeekdayLogItem(data[i].loading_time, newDate)

      this.dataArray[originalDate.getDay()].push(obj)
    }
    console.log(this.dataArray)
  }

  generateSingleLinechartArray() {
    for (let weekday = 0; weekday < this.singleArray.length; weekday++) {

      // SLOT CREATION

      // Estremi
      let slots: WeekdaySlot[] = []
      slots.push(new WeekdaySlot(getMinMaxDates(0, 0, 0, 14), getMiddleDate(0, 0, 0)))
      slots.push(new WeekdaySlot(getMinMaxDates(23, 30, 23, 59), getMiddleDate(23, 59, 59)))

      // inizio ciclo
      let dates = getMinMaxDates(0, 15, 0, 45)
      let middleDate = getMiddleDate(0, 30, 0)
      slots.push(new WeekdaySlot(dates, middleDate))
      let lastMaxHour = getMiddleDate(23, 30, 0)

      while(dates[1] < lastMaxHour) {
        dates[0] = addMinutes(dates[0], 30)
        dates[1] = addMinutes(dates[1], 30)
        middleDate = addMinutes(middleDate, 30)
        slots.push(new WeekdaySlot(dates, middleDate))
      }

      // aggiunta loading time agli slot
      for (let i = 0; i < this.dataArray[weekday].length; i++) {
        let log = this.dataArray[weekday][i]
        for (let slotIndex = 0; slotIndex < slots.length; slotIndex++) {
          if(log.date > slots[slotIndex].minDate && log.date < slots[slotIndex].maxDate) {
            slots[slotIndex].addTime(log.loading_time)
          }
        }
      }

      // generazione singleArray
      for (let slotIndex = 0; slotIndex < slots.length; slotIndex++) {
        let slot = slots[slotIndex]
        let loadingTime = 0
        for (let j = 0; j < slot.loading_times.length; j++) {
          loadingTime = loadingTime + slot.loading_times[j]
        }
        this.singleArray[weekday].push(new WeekdayLogItem(loadingTime/slot.loading_times.length, slot.date))
      }

    }
  }

  getWeekDay(weekday: number): WeekdayLogItem[] {
    return this.dataArray[weekday]
  }

  getSingleWeekDay(weekDay: number) {
    return this.singleArray[weekDay]
  }

}
