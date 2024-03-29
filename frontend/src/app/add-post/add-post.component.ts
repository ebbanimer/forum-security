import { Component, EventEmitter, Output} from '@angular/core';
import { BackendService } from '../backend.service';
import { Post } from '../post';
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

/**
 * Component for adding posts.
 */
export class AddPostComponent {

  content: string;

  message: string | undefined;

  // Emitter for telling the post list in the parent component that a new post has been added.
  @Output() newPostEvent: EventEmitter<Post>;

  constructor(private backend: BackendService) {
    this.content = "";
    this.newPostEvent = new EventEmitter<Post>();
  }

  /**
   * Method for adding a post, communicats the input to the backend service.
   */
  addPost() {
    let addPostPromise: Promise<Post>;
    addPostPromise = this.backend.addPost(this.content);

    // Call the handle methods depending on the outcome of the promise.
    addPostPromise
      .then(post => this.handleAddedPost(post))
      .catch(error => this.handleError(error));
  }

  /**
   * Clears the user input and displays a message that the post has been added.
   * @param post is the post that has been added.
   */
  handleAddedPost(post: Post) {
    // Clear user input.
    this.content = "";

    // Create and display a success message.
    const message: string = `The post was added`;
    this.displayMessage(message);

    // Emit the post so that the parent component can update the list of posts.
    this.newPostEvent.emit(post)
  }

  /**
   * Handles errors when adding posts.
   * @param error is the error thrown by the client.
   */
  handleError(error: HttpErrorResponse) {
    console.error(`error adding post: ${error.status} ${error.statusText}`);
    const message: string = error.message;
    // Display the error message.
    this.displayMessage(message);
  }

  /**
   * Displays a message when the user is trying to add a post.
   * @param message is the message to display.
   */
  displayMessage(message: string) {
    this.message = message; // Hides the message if message parameter is undefined.

    // Set a timeout that ensures that the message is only displayed for 5 seconds.
    setTimeout(() => {
      this.message = undefined; 
    },
      5000);
  }
}
