import { Component, OnInit } from '@angular/core';

import { ChatModule } from '../chatClient/chat/chat.module';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  pdfSrc = '../../assets/pdf_files/ARM.pdf';

  constructor() { }

  ngOnInit(): void {
  }

}
