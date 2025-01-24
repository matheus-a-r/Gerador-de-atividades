import { Body, Controller, Get, Post, Req } from '@nestjs/common';

@Controller('template')
export class TemplateController {

    @Post()
    generateTemplate(@Req() req, @Body() template) {
      console.log(template)
        const jsonResponse = {
            ano: template.ano,
            assunto: template.assunto,
            tematica: template.tematica,
            task: "The student will learn to count and perform basic addition by identifying the number of cacti in the image and connecting it with the image that has the most cacti, then calculating the total sum of cacti in both images.",
            layout: "The question is divided into two main sections. The top section contains a paragraph describing the task. The middle section contains a 2x1 grid with two images of cacti, one image in each row. The bottom section contains a paragraph explaining the question.",
            answer: "To answer this question correctly, the student needs to: 1) count the number of cacti in the first image (4 cacti), 2) count the number of cacti in the second image (7 cacti), 3) identify the image with the most cacti (the second image), and 4) calculate the sum of cacti in the two images (4 + 7 = 11). The correct answer is 11."
        };

        const htmlResponse = `<!DOCTYPE html>
<html lang="en">
  <head></head>
  <style>
    .container {
      display: grid;
      grid-template-columns: 800px;
      grid-template-rows: 400px 400px;
      grid-template-areas:
        "img1"
        "img2";
    }

    .img1 {
      grid-area: img1;
    }

    .img2 {
      grid-area: img2;
    }

    img {
      width: 300px;
      height: 300px;
    }
  </style>
  <body>
    <div
      style="width: 800px; border: solid 1px"
      exp="div containing the sheet width, which in this case is 800px"
    >
      <div class="question">
        <p
          exp="Question description, containing the explanation of what the student will have to do to answer the question correctly"
        >
          Observe the images below and connect the image with the most cacti, then write the sum of all the cacti below.
        </p>

        <div class="container">
          <div class="img1">
            <img
              alt="image in a coloring book style of 4 cacti in the desert"
              exp="image that the student will have to count the number of cacti present, being 4"
            />
          </div>

          <div class="img2">
            <img
              alt="image in a coloring book style of 7 cacti in the desert"
              exp="image that the student will have to count the number of cacti present, being 7"
            />
          </div>
        </div>
      </div>
    </div>
  </body>
</html>`;
        const styleContentMatch = htmlResponse.match(/<style>([\s\S]*?)<\/style>/);
        const divContentMatch = htmlResponse.match(/<body[^>]*>([\s\S]*?)<\/body>/);
        
        return {
            params: jsonResponse,
            style: styleContentMatch ? styleContentMatch[1].trim() : '',
            html: divContentMatch ? divContentMatch[1].trim() : ''
        };
    }

}
