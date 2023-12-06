import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid'
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {

    private _cars: Car[] = [
        // { id: uuid(), brand: 'Honda', model: 'Civic'},
        // { id: uuid(), brand: 'Toyota', model: 'Corolla'},
        // { id: uuid(), brand: 'Jeep', model: 'Cherokee'},
    ];

    findAll() {
        return this._cars
    }

    findOneById(id: string) {
        const car = this._cars.find( car => car.id === id);

        if (!car) {
            throw new NotFoundException(`Cannot find car with id ${id}`);
        }

        return car;
    }

    create(createCarDto: CreateCarDto) {
        const newCar: Car = {
            id: uuid(),
            ...createCarDto
            // brand: createCarDto.brand,
            // model: createCarDto.model
        }
        this._cars.push(newCar);
        return newCar;
    }

    update(id: string, updateCarDto: UpdateCarDto) {
        
        let carDB = this.findOneById(id);
        if (updateCarDto.id && updateCarDto.id !== id) {
            throw new BadRequestException(`Cannot update car with id ${id}`);
        }
        
        this._cars = this._cars.map(car => {
            if (car.id === id) {
                carDB = {
                    ...carDB,
                    ...updateCarDto,
                    id,
                }
                return carDB;
            }
            return car;
        })
        return carDB;
    }

    delete(id: string) {
        const deletedCar = this.findOneById(id);
        this._cars = this._cars.filter(car => car.id != id);
    }

    fillCarsWithSeedData(cars: Car[]) {
        this._cars = cars;
    }

}
