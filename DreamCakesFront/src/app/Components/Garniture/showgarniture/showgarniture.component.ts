import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GarnitureDto } from 'src/app/Model/Garniture';
import { GarnitureService } from 'src/app/Service/garniture.service';

@Component({
  selector: 'app-showgarniture',
  templateUrl: './showgarniture.component.html',
  styleUrls: ['./showgarniture.component.css']
})
export class ShowgarnitureComponent  implements OnInit {
  
  @Output() garnituresSelected = new EventEmitter<GarnitureDto>();

  garnitures: GarnitureDto[] = []; // Assume this array is populated elsewhere
    gateauDto: any = {}; // Initialize gateauDto here
  
    // ...rest of the code
  
    selectGarniture(garniture: GarnitureDto): void {
      this.gateauDto.toppingId = garniture.idTopping;
      console.log('Selected Garniture:', garniture.name);
    }
  
  constructor(private garnitureService: GarnitureService) {}

  ngOnInit(): void {
    this.loadGarnitures();
  }

  loadGarnitures(): void {
    this.garnitureService.getAllGarnitures().subscribe((data: GarnitureDto[]) => {
      this.garnitures = data;
    });
  }

  addGarniture(garniture: GarnitureDto): void {
    this.garnitureService.saveGarniture(garniture).subscribe((newGarniture: GarnitureDto) => {
      this.garnitures.push(newGarniture);
    });
  }

  updateGarniture(id: number, garniture: GarnitureDto): void {
    this.garnitureService.updateGarniture(id, garniture).subscribe((updatedGarniture: GarnitureDto) => {
      const index = this.garnitures.findIndex(g => g.idTopping === id);
      if (index !== -1) {
        this.garnitures[index] = updatedGarniture;
      }
    });
  }

  deleteGarniture(id: number): void {
    this.garnitureService.deleteGarniture(id).subscribe(() => {
      this.garnitures = this.garnitures.filter(g => g.idTopping !== id);
    });
  }
}

