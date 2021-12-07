import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {variable} from "@angular/compiler/src/output/output_ast";
import {Post} from "../../shared/interfaces";
import {PostsService} from "../../shared/posts.service";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;
  constructor(
    private postService: PostsService,
    private alertService: AlertService
  ) {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required)
      }
    )
  }

  ngOnInit(): void {
  }
  submit() {
    if (this.form.invalid) {
      return
    }
    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      Date: new Date()
    }
    this.postService.create(post).subscribe(() => {
      this.form.reset()
      this.alertService.success('Пост был создан')
    })
  }
}
