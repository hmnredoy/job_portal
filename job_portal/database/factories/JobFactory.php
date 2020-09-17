<?php

namespace Database\Factories;

use App\Models\Job;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;


class JobFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Job::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id'       => User::factory()->create(['type' => 'company'])->id,
            'title'         => $this->faker->jobTitle,
            'description'   => $this->faker->sentence(),
            'salary'        => $this->faker->randomFloat(1,10000, 80000),
            'location'      => $this->faker->locale,
            'country'       => $this->faker->country,
            'status'        => $this->faker->boolean(90),
        ];
    }
}
