import React from "react";
import Snowman from "./Snowman";
import { render, fireEvent } from "@testing-library/react";

describe("Snowman", function(){
  test("should end after 6 wrong guesses", function() {
    const { container, debug } = render(<Snowman />);
    debug(container);

    //make 6 incorrect guesses
    const letterButtons = Array.from(container.querySelectorAll("button"));
    //console.log(letterButtons);
    const wrongLetters = ["z","y","x","w","v", "u"];
    const wrongButtons = letterButtons.filter(button => wrongLetters.includes(button.getAttribute("value")));
    //console.log(wrongButtons);

    wrongButtons.map(button => fireEvent.click(button));

    const numberOfButtons = container.querySelectorAll("button").length;

    expect(numberOfButtons).toEqual(0);
    //expect("<p>You Lose!</p>").toBeInDocument();

    expect(container.querySelector("p:last-of-type")).toContainHTML("You Lose!");
    expect(container.querySelector("p:nth-of-type(2)")).toContainHTML("apple");

  });

  test("should pass snapshot test", function(){
    const { container, debug } = render(<Snowman />);
    expect(container).toMatchSnapshot();
  });
});

