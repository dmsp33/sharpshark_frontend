import { ChangeEvent } from "@ckeditor/ckeditor5-angular";

export class DraftProcess {
  protectedStep:number=0;
	accionando: boolean = false;

	//actions By user
	protected:Protected = {
		blockchain: '',
		locked: false,
	}
	userSelectedBlockchain: string = '';
	userSelectedLocked: boolean = false;

	//Message status
	msgSaved!:string;
	msgClass!:string;

  switchViewProtected(step:number) {
    this.protectedStep = step;
    this.accionando = true;
  }
  setBlockchain(blockchain: string) {
    this.userSelectedBlockchain = blockchain;
    this.protected.blockchain = blockchain;
    this.protectedStep++;
  }
  setLocked(locked: boolean) {
    this.userSelectedLocked = locked;
    this.protected.locked = locked;
    this.protectedStep ++;
  }
  CancelDataProtect() {
    this.accionando = false;
    this.protectedStep = 0;
    this.msgClass = 'estatus-chip-advertencia'; 
    this.msgSaved = 'Failed to protect';
  }
}


export interface Protected {
	blockchain:string;
	locked:boolean;
}