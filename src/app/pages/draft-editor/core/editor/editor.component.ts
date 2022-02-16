import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { DraftProcess } from '../draft-process';
import * as AppEditor from './build/ckeditor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input()  data!: any;
  @Output() dataChange = new EventEmitter<any>();

  public Editor = AppEditor;
  document: EditorData = {
    title: '',
    content: '',
    all: '',
  };

  constructor() { }
  
  ngOnInit(): void {
    // console.log('recibiendo data', this.data);
    this.document.title = this.data.title;
    this.document.content = this.data.content;
    this.document.all = `<h1>${this.document.title}</h1>`+this.document.content;
  }
  
  
  public onChangeEditor( { editor }: ChangeEvent ) {
    const editorData = editor.getData();
    const parseData = this._separateContent(editorData);
    this.document.title = parseData.title
    this.document.content = parseData.content;
    this.dataChange.emit(this.document);
  }
  private _getTitle (data) {
    const title = data.getElementsByTagName('h1')[0];
    return title.innerHtml || title.innerText || "";
  }
  private _getBody (data) {
    const title = data.getElementsByTagName('h1')[0];
    data.body.removeChild(title);
    return data.body.innerHTML;
  }
  private _separateContent (data) {
    const dom = new DOMParser().parseFromString(data, 'text/html');
      return {
      title: this._getTitle(dom),
      content: this._getBody(dom),
      all: data,
    };
  }
}


interface EditorData {
  title: string,
  content: string,
  all: string;
}