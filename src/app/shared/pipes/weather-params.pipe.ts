import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weatherParams'
})
export class WeatherParamsPipe implements PipeTransform {

  transform(value: number, param: string): string | number {
    if (param === 'wind') {// Переводим метеорологические градусы (азимут точки, откуда дует ветер) в направление
      if (value === 0 || value === 360) {
        return 'С';
      } else if (value > 0 && value < 90) {
        return 'СВ';
      } else if (value === 90) {
        return 'С';
      } else if (value > 90 && value < 180) {
        return 'ЮВ';
      } else if (value === 180) {
        return 'Ю';
      } else if (value > 180 && value < 270) {
        return 'ЮЗ';
      } else if (value === 270) {
        return 'З';
      } else if (value > 270 && value < 360) {
        return 'СЗ';
      }
    } else if (param === 'pressure') {// Переводим значение атмосферного давления из гПа в мм.рт.ст.
      return (value * 0.75006).toFixed(0); // 0.75006 - эквивалент 1 гПа в мм.рт.ст.
    } else if (param === 'precipitation') {// Определяем тип осадков
      if (value >= 200 && value < 300) {
        return 'гроза';
      } else if (value >= 502 && value < 600) {
        return 'сильный дождь';
      } else if (value === 602 || value === 622) {
        return 'сильный снегопад';
      }

      return 'неизвестный тип осадков';
    }

    return null;
  }

}
