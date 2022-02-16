import { Component, Input, OnInit } from "@angular/core";
import { Certificado } from "../../../core/api";
import { DateFormats } from "../../../shared/constants/date-formats.constant";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "sh-certificate-body",
  templateUrl: "./certificate-body.component.html",
  styleUrls: ["./certificate-body.component.scss"],
})
export class CertificateBodyComponent implements OnInit {
  urlIpfs: string;
  @Input() certificate: Certificado;
  // TODO: take it from store???
  @Input() certificateOtherVersions: Certificado[];

  readonly DateFormats = DateFormats;
  ngOnInit(): void {
    this.urlIpfs = `${environment.baseUrlIPFS}${this.certificate.ipfs}`;
    this.certificate.ipfs = this.urlIpfs;
  }
}
