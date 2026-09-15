using Microsoft.Extensions.Options;
using MobileApp.Api.Services;
using MobileApp.Api.Settings;
using MongoDB.Driver;
using Microsoft.AspNetCore.Identity;
using MobileApp.Api.Models;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;


var builder = WebApplication.CreateBuilder(args);

// Register controllers.
builder.Services.AddControllers();

// Register Swagger for development testing.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Load and validate MongoDB settings.
builder.Services
    .AddOptions<MongoDbSettings>()
    .Bind(builder.Configuration.GetSection(MongoDbSettings.SectionName))
    .Validate(
        settings => !string.IsNullOrWhiteSpace(
            settings.ConnectionString),
        "MongoDB connection string is required.")
    .Validate(
        settings => !string.IsNullOrWhiteSpace(
            settings.DatabaseName),
        "MongoDB database name is required.")
    .Validate(
        settings => !string.IsNullOrWhiteSpace(
            settings.MealsCollectionName),
        "MongoDB Meals collection name is required.")
    .Validate(
        settings => !string.IsNullOrWhiteSpace(
            settings.CategoriesCollectionName),
        "MongoDB Categories collection name is required.")
    .ValidateOnStart();

// Register one MongoDB client for the application.
builder.Services.AddSingleton<IMongoClient>(serviceProvider =>
{
    var settings = serviceProvider
        .GetRequiredService<IOptions<MongoDbSettings>>()
        .Value;

    return new MongoClient(settings.ConnectionString);
});

// Register the MealsDb database.
builder.Services.AddSingleton<IMongoDatabase>(serviceProvider =>
{
    var settings = serviceProvider
        .GetRequiredService<IOptions<MongoDbSettings>>()
        .Value;

    var mongoClient = serviceProvider
        .GetRequiredService<IMongoClient>();

    return mongoClient.GetDatabase(settings.DatabaseName);
});

// Register services.
builder.Services.AddScoped<IMealService, MealService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IPasswordHasher<AppUser>, PasswordHasher<AppUser>>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITokenService, TokenService >();

builder.Services
    .AddOptions<JwtSettings>()
    .Bind(
        builder.Configuration.GetSection(
            JwtSettings.SectionName
        )
    )
    .Validate(
        settings =>
            !string.IsNullOrWhiteSpace(settings.SecretKey),
        "JWT secret key is required."
    )
    .ValidateOnStart();





var jwtSettings = builder.Configuration
                      .GetSection(JwtSettings.SectionName)
                      .Get<JwtSettings>()
                  ?? throw new InvalidOperationException(
                      "JWT settings are missing."
                  );

builder.Services
    .AddAuthentication(
        JwtBearerDefaults.AuthenticationScheme
    )
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = jwtSettings.Issuer,

                ValidateAudience = true,
                ValidAudience = jwtSettings.Audience,

                ValidateIssuerSigningKey = true,
                IssuerSigningKey =
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(
                            jwtSettings.SecretKey
                        )
                    ),

                ValidateLifetime = true,
                ClockSkew = TimeSpan.FromSeconds(30)
            };
    });

builder.Services.AddAuthorization();
var app = builder.Build();

// Swagger is useful for testing your API on your computer.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Local mobile testing can use HTTP to avoid development
// certificate problems. Production should use HTTPS.
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();